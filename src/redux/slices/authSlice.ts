import { createApi } from '@reduxjs/toolkit/query/react';
import { type UserType, type UserData, type AuthResponse } from '@/types';
import baseQueryWithReauth from './basicBaseQuery';

export const authSlice = createApi({
  reducerPath: 'authSlice',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['AuthInfo'],
  endpoints: (build) => ({
    authMe: build.query<{ user: UserType }, void>({
      query: () => 'auth/me',
      providesTags: ['AuthInfo'],
    }),
    login: build.mutation<AuthResponse, { login: string; password: string }>({
      query: (body) => ({
        url: 'auth/login',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['AuthInfo'],
    }),
    signUp: build.mutation<AuthResponse, UserData>({
      query: (body) => ({
        url: 'auth/register',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['AuthInfo'],
    }),
    editInfo: build.mutation<{ user: UserType }, FormData>({
      query: (formData) => ({
        url: 'users/me',
        method: 'PATCH',
        body: formData,
      }),
      invalidatesTags: ['AuthInfo'],
    }),
  }),
});

export const {
  useAuthMeQuery,
  useLoginMutation,
  useSignUpMutation,
  useEditInfoMutation,
} = authSlice;
