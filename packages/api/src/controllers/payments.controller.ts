import { Controller, Get, Param, Post, Request, Response, UseGuards } from '@nestjs/common';
import {
  GetAccessOptionsReply,
  GetPaymentsHistoryReply,
  GetWalletReply,
  RedeemInviteArgs,
  RedeemInviteReply,
  VerifyPaymentArgs,
  VerifyPaymentReply,
} from '@xyz27900/bluevpn-common/dist/cjs/dto/payments.dto';
import { ethers } from 'ethers';
import { DateTime } from 'luxon';
import { EntityManager } from 'typeorm';
import { BLOCKCHAIN_WALLET } from '@/config';
import { errInvalidCredentials, errInvalidPassword } from '@/errors/auth.errors';
import { errInvalidAccessOption, errInvalidInvite, errInvalidTransaction } from '@/errors/payments.errors';
import { LoggedInGuard } from '@/guards/logged-in.guard';
import { AccessService } from '@/services/access.service';
import { BlockchainService } from '@/services/blockchain.service';
import { InviteService } from '@/services/invite.service';
import { OpenVpnService } from '@/services/openvpn.service';
import { OrderService } from '@/services/order.service';
import { UserService } from '@/services/user.service';
import { ExpressRequest, ExpressResponse } from '@/types/express';

@Controller('/payments')
export class PaymentsController {
  private readonly entityManager: EntityManager;
  private readonly accessService: AccessService;
  private readonly blockchainService: BlockchainService;
  private readonly inviteService: InviteService;
  private readonly openVpnService: OpenVpnService;
  private readonly orderService: OrderService;
  private readonly userService: UserService;

  constructor(entityManager: EntityManager, accessService: AccessService, blockchainService: BlockchainService, inviteService: InviteService, openVpnService: OpenVpnService, orderService: OrderService, userService: UserService) {
    this.accessService = accessService;
    this.entityManager = entityManager;
    this.blockchainService = blockchainService;
    this.inviteService = inviteService;
    this.openVpnService = openVpnService;
    this.orderService = orderService;
    this.userService = userService;
  }

  @Get('/wallet')
  public async getWallet(@Response() res: ExpressResponse<GetWalletReply>): Promise<void> {
    res.send({ wallet: BLOCKCHAIN_WALLET });
  }

  @Get('/access-options')
  public async getAccessOptions(@Response() res: ExpressResponse<GetAccessOptionsReply>): Promise<void> {
    const accessOptions = await this.accessService.getAll();
    res.send(accessOptions.map(accessOption => accessOption.toJSON()));
  }

  @UseGuards(LoggedInGuard)
  @Post('/verify/:id')
  public async verifyPayment(@Param('id') idStr: string, @Request() req: ExpressRequest<VerifyPaymentArgs>, @Response() res: ExpressResponse<VerifyPaymentReply>): Promise<void> {
    const { user } = req;
    if (!user) {
      throw errInvalidCredentials;
    }

    const id = Number(idStr);
    if (isNaN(id)) {
      throw errInvalidAccessOption;
    }

    const accessOption = await this.accessService.findById(id);
    if (!accessOption) {
      throw errInvalidAccessOption;
    }

    const password = req.body.password?.trim();
    if (!password) {
      throw errInvalidPassword;
    }

    const isPasswordValid = await this.userService.verifyPassword(password, user);
    if (!isPasswordValid) {
      throw errInvalidPassword;
    }

    const txHash = req.body.txHash?.trim();
    if (!txHash) {
      throw errInvalidTransaction;
    }

    const transaction = await this.blockchainService.getTransaction(txHash);
    if (!transaction) {
      throw errInvalidTransaction;
    }

    const to = transaction.to;
    const value = ethers.utils.formatEther(transaction.value);
    if (to !== BLOCKCHAIN_WALLET) {
      throw errInvalidTransaction;
    }

    if (value !== accessOption.price) {
      throw errInvalidTransaction;
    }

    const now = DateTime.now();

    const order = this.orderService.createPayment(now.toJSDate(), accessOption, user);
    await this.entityManager.save(order);

    user.expireDate = now.plus({ seconds: accessOption.duration }).set({ second: 0, millisecond: 0 }).toJSDate();
    await this.entityManager.save(user);

    await this.openVpnService.createClient(user, password);

    res.send(user.toJSON());
  }

  @UseGuards(LoggedInGuard)
  @Post('/invite')
  public async redeemInvite(@Request() req: ExpressRequest<RedeemInviteArgs>, @Response() res: ExpressResponse<RedeemInviteReply>): Promise<void> {
    const { user } = req;
    if (!user) {
      throw errInvalidCredentials;
    }

    const password = req.body.password?.trim();
    if (!password) {
      throw errInvalidPassword;
    }

    const isPasswordValid = await this.userService.verifyPassword(password, user);
    if (!isPasswordValid) {
      throw errInvalidPassword;
    }

    const code = req.body.code?.trim();
    if (!code) {
      throw errInvalidInvite;
    }

    const invite = await this.inviteService.findByCode(code);
    if (!invite || invite.used) {
      throw errInvalidInvite;
    }

    const accessOption = invite.accessOption;
    const now = DateTime.now();

    const order = this.orderService.createInvite(now.toJSDate(), accessOption, user);
    invite.used = true;
    await this.entityManager.save(invite);
    await this.entityManager.save(order);

    user.expireDate = now.plus({ seconds: accessOption.duration }).set({ second: 0, millisecond: 0 }).toJSDate();
    await this.entityManager.save(user);

    await this.openVpnService.createClient(user, password);

    res.send(user.toJSON());
  }

  @UseGuards(LoggedInGuard)
  @Get('/history')
  public async getPaymentsHistory(@Request() req: ExpressRequest, @Response() res: ExpressResponse<GetPaymentsHistoryReply>): Promise<void> {
    const { user } = req;
    if (!user) {
      throw errInvalidCredentials;
    }

    const orders = await this.orderService.findByUser(user);
    res.send(orders.map(order => order.toJSON()));
  }
}
