import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  id: string | null;
  name: string | null;
  email: string | null;
}
const initialState: UserState = {
  id: null,
  name: null,
  email: null,
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => action.payload,
    clearUser: () => initialState,
  },
});

export const userActions = slice.actions;

export const userReducer = slice.reducer;
