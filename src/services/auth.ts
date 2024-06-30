import {
  ForgotPasswordRequest,
  LoginType,
  RegisterType,
  ResetPasswordRequest,
  VerifyEmailReponse,
  VerifyEmailRequest,
} from '@/models/auth';
import api from '../api';

export const registerApi = async (payload: RegisterType) => {
  try {
    const res = await api.post('api/Auth/register', { ...payload });
    return res;
  } catch (error) {
    return undefined;
  }
};

export const loginApi = async (payload: LoginType) => {
  try {
    const res = await api.post('/api/Auth/login', {
      ...payload,
    });
    return res;
  } catch (error) {
    return undefined;
  }
};

export const verifyEmailApi = async (payload: VerifyEmailRequest) => {
  try {
    const res = await api.post('/api/Auth/confirm-email', {
      ...payload,
    });
    return res;
  } catch (error) {
    return undefined;
  }
};

export const forgotPasswordApi = async (payload: ForgotPasswordRequest) => {
  try {
    const res = await api.post('/api/Auth/forgot-password', { ...payload });
    return res;
  } catch (error) {
    return undefined;
  }
};

export const resetPasswordApi = async (payload: ResetPasswordRequest) => {
  try {
    const res = await api.post('/api/Auth/reset-password', { ...payload });
    return res;
  } catch (error) {
    return undefined;
  }
};

export const logoutApi = async () => {
  try {
    const res = await api.post('/api/Logout/logout');
    return res;
  } catch (error) {
    return undefined;
  }
};
