import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  LoginArgs,
  LoginReply,
  ResetPasswordArgs,
  RestorePasswordArgs,
  SignUpArgs,
  SignUpReply,
  WhoamiReply,
} from '@xyz27900/bluevpn-common/dist/es/dto/auth.dto';

export const authApi = createApi({
  reducerPath: 'auth-api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/auth' }),
  endpoints: (builder) => ({
    whoami: builder.mutation<WhoamiReply, object>({
      query: () => ({
        method: 'GET',
        url: 'whoami',
      }),
    }),
    login: builder.mutation<LoginReply, LoginArgs>({
      query: (args) => ({
        method: 'POST',
        url: 'login',
        body: args,
      }),
    }),
    signUp: builder.mutation<SignUpReply, SignUpArgs>({
      query: (args) => ({
        method: 'POST',
        url: 'signup',
        body: args,
      }),
    }),
    restorePassword: builder.mutation<'', RestorePasswordArgs>({
      query: (args) => ({
        method: 'POST',
        url: 'restore-password',
        body: args,
      }),
    }),
    resetPassword: builder.mutation<'', ResetPasswordArgs>({
      query: (args) => ({
        method: 'POST',
        url: 'reset-password',
        body: args,
      }),
    }),
  }),
});
