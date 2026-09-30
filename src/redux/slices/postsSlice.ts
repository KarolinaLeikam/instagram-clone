import { createApi } from '@reduxjs/toolkit/query/react';
import type { PostType } from '@/types';
import baseQueryWithReauth from './basicBaseQuery';

// Define a service using a base URL and expected endpoints
export const postsSlice = createApi({
  reducerPath: 'postsSlice',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Posts'],
  endpoints: (build) => ({
    getGridPosts: build.query<PostType[], string | undefined>({
      query: (username) => `users/${username}/posts`,
      providesTags: ['Posts'],
    }),
    createPost: build.mutation<PostType, FormData>({
      query: (formData) => ({
        url: 'posts',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Posts'],
    }),
    deletePost: build.mutation<void, string>({
      query: (id) => ({
        url: `posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Posts'],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetGridPostsQuery,
  useCreatePostMutation,
  useDeletePostMutation,
} = postsSlice;
