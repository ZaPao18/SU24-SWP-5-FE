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

export type UserInfoUser = {
  activated: boolean;
  avatar: string;
  collectionId: string;
  collectionName: string;
  created: string;
  dateOfBirth: string;
  email: string;
  emailVisibility: false;
  fullName: string;
  id: string;
  phoneNumber: string;
  subscription: string;
  updated: string;
  username: string;
  verified: false;
};

export type AuthResponse = {
  user: UserInfoUser;
  token?: string;
};
