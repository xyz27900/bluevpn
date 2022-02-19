import { Controller, Get, Post, Request, Response, UseGuards } from '@nestjs/common';
import {
  LoginArgs,
  LoginReply,
  ResetPasswordArgs,
  RestorePasswordArgs,
  SignUpArgs,
  SignUpReply,
  WhoamiReply,
} from '@xyz27900/bluevpn-common/dist/cjs/dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { EntityManager } from 'typeorm';
import { HOSTNAME } from '@/config';
import {
  errEmailAlreadyTaken,
  errEmailNotFound,
  errExpiredToken,
  errInvalidEmail,
  errInvalidPassword,
  errInvalidToken,
  errInvalidCredentials,
} from '@/errors/auth.errors';
import { LoggedInGuard } from '@/guards/logged-in.guard';
import { LoginGuard } from '@/guards/login.guard';
import { MailService } from '@/services/mail.service';
import { ResetService } from '@/services/reset.service';
import { UserService } from '@/services/user.service';
import { ExpressRequest, ExpressResponse } from '@/types/express';

@Controller('/auth')
export class AuthController {
  private readonly entityManager: EntityManager;
  private readonly userService: UserService;
  private readonly resetService: ResetService;
  private readonly mailService: MailService;

  constructor(entityManager: EntityManager, userService: UserService, resetService: ResetService, mailService: MailService) {
    this.entityManager = entityManager;
    this.userService = userService;
    this.resetService = resetService;
    this.mailService = mailService;
  }

  @UseGuards(LoggedInGuard)
  @Get('/whoami')
  public async whoami(@Request() req: ExpressRequest, @Response() res: ExpressResponse<WhoamiReply>): Promise<void> {
    const { user } = req;
    if (!user) {
      throw errInvalidCredentials;
    }

    res.send(user.toJSON());
  }

  @UseGuards(LoginGuard)
  @Post('/login')
  public async login(@Request() req: ExpressRequest<LoginArgs>, @Response() res: ExpressResponse<LoginReply>): Promise<void> {
    const { user } = req;
    if (!user) {
      throw errInvalidCredentials;
    }

    res.send(user.toJSON());
  }

  @Post('/signup')
  public async signup(@Request() req: ExpressRequest<SignUpArgs>, @Response() res: ExpressResponse<SignUpReply>): Promise<void> {
    const email = req.body.email?.trim();
    const password = req.body.password?.trim();
    if (!email) {
      throw errInvalidEmail;
    }

    if (!password) {
      throw errInvalidPassword;
    }

    const foundUser = await this.userService.findByEmail(email);
    if (foundUser) {
      throw errEmailAlreadyTaken;
    }

    const user = await this.userService.createUser(email, password);
    await this.entityManager.save(user);
    req.logOut();
    req.logIn(user, () => res.send(user.toJSON()));
  }

  @Post('/restore-password')
  public async restorePassword(@Request() req: ExpressRequest<RestorePasswordArgs>, @Response() res: ExpressResponse): Promise<void> {
    const email = req.body.email?.trim();
    if (!email) {
      throw errInvalidEmail;
    }

    const foundUser = await this.userService.findByEmail(email);
    if (!foundUser) {
      throw errEmailNotFound;
    }

    const resetToken = this.resetService.createToken(foundUser);
    const resetLink = `https://${HOSTNAME}/auth/reset-password?token=${resetToken.token}`;
    await this.entityManager.save(resetToken);

    await this.mailService.sendEmail({
      to: foundUser.email,
      subject: 'Password recovery',
      text: `
        You are receiving this because you (or someone else) have requested the reset of the password for your account.
        Please click on the following link, or paste this into your browser to complete the process:
        ${resetLink}
        If you did not request this, please ignore this email and your password will remain unchanged.
      `,
    });

    res.send('');
  }

  @Post('/reset-password')
  public async resetPassword(@Request() req: ExpressRequest<ResetPasswordArgs>, @Response() res: ExpressResponse): Promise<void> {
    const token = req.body.token;
    const password = req.body.password?.trim();

    if (typeof token === 'undefined') {
      throw errInvalidToken;
    }

    if (typeof password === 'undefined') {
      throw errInvalidPassword;
    }

    const resetToken = await this.resetService.findToken(token);
    if (!resetToken) {
      throw errInvalidToken;
    }

    if(resetToken.luxonExpireDate.diffNow().milliseconds < 0) {
      throw errExpiredToken;
    }

    const { user } = resetToken;
    user.hash = await bcrypt.hash(password, 10);
    await this.entityManager.remove(resetToken);
    await this.entityManager.save(user);

    res.send('');
  }
}
