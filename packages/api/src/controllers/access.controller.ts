import { Controller, Post, Request, Response, UseGuards } from '@nestjs/common';
import { RedeemInviteArgs, RedeemInviteReply } from '@xyz27900/bluevpn-common/dist/cjs/dto/access.dto';
import { DateTime } from 'luxon';
import { EntityManager } from 'typeorm';
import { errInvalidInvite } from '@/errors/access.errors';
import { errInvalidCredentials, errInvalidPassword } from '@/errors/auth.errors';
import { LoggedInGuard } from '@/guards/logged-in.guard';
import { AccessService } from '@/services/access.service';
import { InviteService } from '@/services/invite.service';
import { OpenVpnService } from '@/services/openvpn.service';
import { UserService } from '@/services/user.service';
import { ExpressRequest, ExpressResponse } from '@/types/express';

@Controller('/access')
export class AccessController {
  private readonly entityManager: EntityManager;
  private readonly accessService: AccessService;
  private readonly inviteService: InviteService;
  private readonly openVpnService: OpenVpnService;
  private readonly userService: UserService;

  constructor(entityManager: EntityManager, accessService: AccessService, inviteService: InviteService, openVpnService: OpenVpnService, userService: UserService) {
    this.accessService = accessService;
    this.entityManager = entityManager;
    this.inviteService = inviteService;
    this.openVpnService = openVpnService;
    this.userService = userService;
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

    invite.used = true;
    await this.entityManager.save(invite);

    user.expireDate = now.plus({ seconds: accessOption.duration }).set({ second: 0, millisecond: 0 }).toJSDate();
    await this.entityManager.save(user);

    await this.openVpnService.createClient(user, password);

    res.send(user.toJSON());
  }
}
