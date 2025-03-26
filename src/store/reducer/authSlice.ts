// redux/slices/authSlice.ts
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import EncryptedStorage from 'react-native-encrypted-storage';

interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  loading: true,
};

// Async thunk to check token on app launch
export const checkAuth = createAsyncThunk('auth/checkAuth', async () => {
  const token = await EncryptedStorage.getItem('token');
  return !!token;
});

// Logout thunk
export const logout = createAsyncThunk('auth/logout', async () => {
  await EncryptedStorage.removeItem('token');
  return false;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: state => {
      state.isAuthenticated = true;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(checkAuth.pending, state => {
        state.loading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isAuthenticated = action.payload;
        state.loading = false;
      })
      .addCase(logout.fulfilled, state => {
        state.isAuthenticated = false;
      });
  },
});

export const {loginSuccess} = authSlice.actions;

export default authSlice.reducer;
