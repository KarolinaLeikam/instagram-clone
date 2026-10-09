import { configureStore } from '@reduxjs/toolkit';
import * as Sentry from '@sentry/react';
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
  enhancers: (getDefaultEnhancers) =>
    getDefaultEnhancers().concat(Sentry.createReduxEnhancer()),
});

setupListeners(store.dispatch);

export default store;
