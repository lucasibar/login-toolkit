import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface AuthState {
  token: string | null;
  isAdmin: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  isAdmin: localStorage.getItem('isAdmin') === 'true',
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<{ token: string; isAdmin: boolean }>) => {
      state.loading = false;
      state.token = action.payload.token;
      state.isAdmin = action.payload.isAdmin;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('isAdmin', action.payload.isAdmin.toString());
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.isAdmin = false;
      localStorage.removeItem('token');
      localStorage.removeItem('isAdmin');
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;

export const login = (email: string, password: string) => async (dispatch: any) => {
  try {
    dispatch(loginStart());
    const response = await axios.post('http://localhost:3000/auth/login', { email, password });
    dispatch(loginSuccess({ token: response.data.access_token, isAdmin: email === 'administracion@prueba.com.ar' }));
  } catch (error: any) {
    dispatch(loginFailure(error.response?.data?.message || 'Error de autenticación'));
  }
};

export const register = (email: string, password: string) => async (dispatch: any) => {
  try {
    dispatch(loginStart());
    const response = await axios.post('http://localhost:3000/auth/register', { email, password });
    dispatch(loginSuccess({ token: response.data.access_token, isAdmin: false }));
  } catch (error: any) {
    dispatch(loginFailure(error.response?.data?.message || 'Error al registrar'));
  }
};

export default authSlice.reducer; 