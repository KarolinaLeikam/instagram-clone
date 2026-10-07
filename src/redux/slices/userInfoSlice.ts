import { createApi } from '@reduxjs/toolkit/query/react';
import { type ContextUserFriend, type FollowResponse } from '@/types';
import baseQueryWithReauth from './basicBaseQuery';

export const userInfo = createApi({
  reducerPath: 'userInfo',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['userInfo'],
  endpoints: (build) => ({
    getUserInfo: build.query<ContextUserFriend, string>({
      query: (username) => `users/${username}`,
      providesTags: ['userInfo'],
    }),
    followUser: build.mutation<
      FollowResponse,
      { method: string; username: string | undefined }
    >({
      query: ({ method, username }) => ({
        url: `users/${username}/follow`,
        method,
      }),
      invalidatesTags: ['userInfo'],
    }),
  }),
});

export const { useGetUserInfoQuery, useFollowUserMutation } = userInfo;
