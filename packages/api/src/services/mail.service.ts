import { Injectable } from '@nestjs/common';
import { createTransport, Transporter } from 'nodemailer';
import { MAIL_ACCOUNT_PASSWORD, MAIL_ACCOUNT_EMAIL, MAIL_SERVICE } from '@/config';

type SendEmailArgs = {
  to: string;
  subject: string;
  text: string;
}

@Injectable()
export class MailService {
  private readonly transport: Transporter;

  constructor() {
    this.transport = createTransport({
      service: MAIL_SERVICE,
      secure: false,
      auth: {
        user: MAIL_ACCOUNT_EMAIL,
        pass: MAIL_ACCOUNT_PASSWORD,
      },
    });
  }

  public async sendEmail(args: SendEmailArgs): Promise<void> {
    await this.transport.sendMail({ from: MAIL_ACCOUNT_EMAIL, ...args });
  }
}
