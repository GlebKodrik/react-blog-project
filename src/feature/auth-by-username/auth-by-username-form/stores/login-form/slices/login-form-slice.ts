import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { TLoginFormState } from '../types';
import { requestLoginByUser } from '../requests/request-login-by-user';

const initialState: TLoginFormState = {
  username: '',
  password: '',
  error: null,
  isLoading: false,
};

export const loginFormSlice = createSlice({
  name: 'loginForm',
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestLoginByUser.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(requestLoginByUser.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action);
      })
      .addCase(requestLoginByUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { actions: loginFormActions } = loginFormSlice;
export const { reducer: loginFormReducer } = loginFormSlice;
