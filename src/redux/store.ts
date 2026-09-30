import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { postsSlice } from './slices/postsSlice';

const store = configureStore({
  reducer: {
    [postsSlice.reducerPath]: postsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postsSlice.middleware),
});

setupListeners(store.dispatch);

export default store;
