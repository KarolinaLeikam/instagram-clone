import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from '@/redux/slices/slice';
import { apiPosts } from '@/redux/slices/allPosts';

export const store = configureStore({
  reducer: {
    user: userReducer,
    [apiPosts.reducerPath]: apiPosts.reducer,
  },
  // RTK Query работает через middleware — оно ловит экшены типа
  // "запрос начался/закончился" и обновляет кэш. Без .concat(...) хуки
  // useXQuery/useXMutation технически не сломаются на typecheck, но
  // никаких данных никогда не получат.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiPosts.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
