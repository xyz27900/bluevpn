import { AccessOptionModel } from '@/models/access-option.model';
import { OrderModel } from '@/models/order.model';
import { UserModel } from '@/models/user.model';

export type GetWalletReply = {
  wallet: string;
}

/* ------ */

export type GetAccessOptionsReply = AccessOptionModel[];

/* ------ */

export type VerifyPaymentArgs = {
  txHash: string;
  password: string;
}

export type VerifyPaymentQuery = {
  id: number;
  query: VerifyPaymentArgs;
}

export type VerifyPaymentReply = UserModel;

/* ------ */

export type RedeemInviteArgs = {
  code: string;
  password: string;
}

export type RedeemInviteReply = UserModel;

/* ------ */

export type GetPaymentsHistoryReply = OrderModel[];
