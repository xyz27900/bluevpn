import { UserModel } from '@/models/user.model';

export type WhoamiReply = UserModel;

/* ------ */

export type LoginArgs = {
  email: string;
  password: string;
}

export type LoginReply = UserModel;

/* ------ */

export type SignUpArgs = {
  email: string;
  password: string;
}

export type SignUpReply = UserModel;

/* ------ */

export type RestorePasswordArgs = {
  email: string;
}

/* ------ */

export type ResetPasswordArgs = {
  password: string;
  token: string;
}
