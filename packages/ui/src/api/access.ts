import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RedeemInviteArgs, RedeemInviteReply } from '@xyz27900/bluevpn-common/dist/es/dto/access.dto';

export const accessApi = createApi({
  reducerPath: 'access-api',
  tagTypes: ['Access'],
  baseQuery: fetchBaseQuery({ baseUrl: '/api/access' }),
  endpoints: (builder) => ({
    redeemInvite: builder.mutation<RedeemInviteReply, RedeemInviteArgs>({
      query: (args) => ({
        method: 'POST',
        url: 'invite',
        body: args,
      }),
      invalidatesTags: ['Access'],
    }),
  }),
});
