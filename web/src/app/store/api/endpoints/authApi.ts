import { LoginBody, LoginResponse, RegisterBody } from '../../../types/Auth';
import { User } from '../../../types/User';
import { baseApi } from '../baseApi';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<void, RegisterBody>({
      query: ({...body}) => ({
        url: '/auth/register',
        method: 'POST',
        body,
      }),
    }),
    login: builder.mutation<LoginResponse, LoginBody>({
      query: ({...body}) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
    }),
    verifyEmail: builder.mutation<User, string>({
      query: (id) => ({
        url: `/auth/verifyEmail/${id}`,
        method: 'POST',
      }),
    }),
    getMe: builder.query<User, void>({
      query: () => ({
        url: '/auth/me'
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useVerifyEmailMutation, useGetMeQuery } = authApi;