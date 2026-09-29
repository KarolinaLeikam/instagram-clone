import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from '@/redux/slices/slice';
import { rtkApi } from '@/utils/rtkApi';
import { setupListeners } from '@reduxjs/toolkit/query/react';

export const store = configureStore({
  reducer: { user: userReducer, [rtkApi.reducerPath]: rtkApi.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rtkApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
