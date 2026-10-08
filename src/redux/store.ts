import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { postsSlice } from './slices/postsSlice';
import { userInfo } from './slices/userInfoSlice';
import { authSlice } from './slices/authSlice';

const store = configureStore({
  reducer: {
    [postsSlice.reducerPath]: postsSlice.reducer,
    [userInfo.reducerPath]: userInfo.reducer,
    [authSlice.reducerPath]: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      postsSlice.middleware,
      userInfo.middleware,
      authSlice.middleware
    ),
});

setupListeners(store.dispatch);

export default store;
