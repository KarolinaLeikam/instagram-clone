import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { postsSlice } from './slices/postsSlice';
import { userInfo } from './slices/userInfoSlice';

const store = configureStore({
  reducer: {
    [postsSlice.reducerPath]: postsSlice.reducer,
    [userInfo.reducerPath]: userInfo.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postsSlice.middleware, userInfo.middleware),
});

setupListeners(store.dispatch);

export default store;
