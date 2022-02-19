import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  GetAccessOptionsReply,
  GetPaymentsHistoryReply,
  GetWalletReply,
  RedeemInviteArgs,
  RedeemInviteReply,
  VerifyPaymentQuery,
  VerifyPaymentReply,
} from '@xyz27900/bluevpn-common/dist/es/dto/payments.dto';

export const paymentsApi = createApi({
  reducerPath: 'payments-api',
  tagTypes: ['Payments'],
  baseQuery: fetchBaseQuery({ baseUrl: '/api/payments' }),
  endpoints: (builder) => ({
    getWallet: builder.mutation<GetWalletReply, object>({
      query: () => ({
        method: 'GET',
        url: 'wallet',
      }),
    }),
    getAccessOptions: builder.mutation<GetAccessOptionsReply, object>({
      query: () => ({
        method: 'GET',
        url: 'access-options',
      }),
    }),
    verifyPayment: builder.mutation<VerifyPaymentReply, VerifyPaymentQuery>({
      query: (args) => ({
        method: 'POST',
        url: `verify/${args.id}`,
        body: args.query,
      }),
      invalidatesTags: ['Payments'],
    }),
    redeemInvite: builder.mutation<RedeemInviteReply, RedeemInviteArgs>({
      query: (args) => ({
        method: 'POST',
        url: 'invite',
        body: args,
      }),
      invalidatesTags: ['Payments'],
    }),
    getPaymentsHistory: builder.query<GetPaymentsHistoryReply, object>({
      query: () => ({
        method: 'GET',
        url: 'history',
      }),
      providesTags: ['Payments'],
    }),
  }),
});
