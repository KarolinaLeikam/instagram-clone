import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import type { PostType } from '@/types';
import API from '@/utils/api';
import { ApiError } from '@/utils/error/classError';

const FALLBACK_ERROR = 'Что-то пошло не так, попробуйте снова';

export const apiPosts = createApi({
  reducerPath: 'apiPosts',

  // Обычно baseQuery в RTK Query сам делает fetch (см. fetchBaseQuery).
  // Нам это не нужно — у нас уже есть рабочий ApiClient (src/utils/api.ts),
  // который умеет и токен подставлять, и FormData отличать от JSON, и
  // ошибки в ApiError заворачивать. fakeBaseQuery() говорит RTK Query:
  // "не делай запрос сам, каждый endpoint опишет queryFn — как получить
  // данные — сам". Так мы не дублируем логику HTTP-запросов, а просто
  // берём RTK Query как слой КЭШИРОВАНИЯ над уже существующим API-клиентом.
  baseQuery: fakeBaseQuery<string>(),

  // "Тег" — это ярлык на данные в кэше. Endpoint, который ЧИТАЕТ данные,
  // помечает их тегом (providesTags). Endpoint, который ИЗМЕНЯЕТ данные,
  // говорит, какие теги устарели (invalidatesTags). RTK Query сам находит
  // все активные запросы с этим тегом и перезапрашивает их — вот и вся
  // магия "не надо руками звать allPostsFetch() после удаления/создания".
  tagTypes: ['Posts'],

  endpoints: (build) => ({
    // build.query — для ЧТЕНИЯ данных (GET-подобные операции).
    // Второй generic-параметр (string | undefined) — тип аргумента,
    // который ты передашь в хук: useGetPostsByNameQuery(username).
    getPostsByName: build.query<PostType[], string | undefined>({
      async queryFn(username) {
        try {
          const data = await API.getGridPosts(username);
          // RTK Query ждёт объект { data } при успехе...
          return { data };
        } catch (err) {
          const message = err instanceof ApiError ? err.code : FALLBACK_ERROR;
          // ...или { error } при ошибке. Компонент получит это через
          // isError/error из хука, без try/catch на своей стороне.
          return { error: message };
        }
      },
      providesTags: ['Posts'],
    }),

    // build.mutation — для ИЗМЕНЕНИЯ данных (POST/PATCH/DELETE-подобные).
    // Первый generic — что вернёт мутация при успехе (PostType — созданный
    // пост). Второй — что мутация принимает на вход (FormData из AddPhoto).
    createPost: build.mutation<PostType, FormData>({
      async queryFn(formData) {
        try {
          const data = await API.createPost(formData);
          return { data };
        } catch (err) {
          const message = err instanceof ApiError ? err.code : FALLBACK_ERROR;
          return { error: message };
        }
      },
      // Создали пост → список постов (тег 'Posts') устарел → RTK Query
      // сам перезапросит getPostsByName везде, где он сейчас смонтирован.
      invalidatesTags: ['Posts'],
    }),

    deletePost: build.mutation<void, string>({
      async queryFn(id) {
        try {
          await API.deletePost(id);
          return { data: undefined };
        } catch (err) {
          const message = err instanceof ApiError ? err.code : FALLBACK_ERROR;
          return { error: message };
        }
      },
      invalidatesTags: ['Posts'],
    }),
  }),
});

// createApi сам генерирует хуки по именам endpoint'ов:
// getPostsByName → useGetPostsByNameQuery, createPost → useCreatePostMutation
// и т.д. Экспортируем их — это то, чем будут пользоваться компоненты.
export const {
  useGetPostsByNameQuery,
  useCreatePostMutation,
  useDeletePostMutation,
} = apiPosts;
