export type RegisterType = {
  email: string;
  customerName: string;
  password: string;
  confirmPassword: string;
};

export type LoginType = {
  email: string;
  password: string;
};

export type VerifyEmailRequest = {
  confirmationCode: string;
};

export type VerifyEmailReponse = {
  email: string;
  code: string;
};

export type ForgotPasswordRequest = {
  email: string;
};

export type ResetPasswordRequest = {
  resetCode: string;
  newPassword: string;
  confirmPassword: string;
};
