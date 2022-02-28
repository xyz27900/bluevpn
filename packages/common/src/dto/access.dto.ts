import { UserModel } from '@/models/user.model';

export type RedeemInviteArgs = {
  code: string;
  password: string;
}

export type RedeemInviteReply = UserModel;
