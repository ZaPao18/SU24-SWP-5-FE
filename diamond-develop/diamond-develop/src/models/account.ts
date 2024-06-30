export type Employee = {
  employeeId: number;
  employeeName: string;
  email: string;
  phone: string;
  role: number;
  status: true;
  loginToken: string;
  loginTokenExpires: string;
};

export type Customer = {
  customerId: number;
  customerName: string;
  email: string;
  phoneNumber: string;
  idCard?: string;
  address: string;
  status?: true;
  resetToken?: string;
  resetTokenExpires?: string;
  loginToken?: string;
  emailConfirmed?: true;
  confirmationToken?: string;
};

export type AccountDetailRequest = {
  customerId?: number;
  customerName: string;
  email: string;
  phoneNumber: string;
  idCard: string;
  address: string;
};

export type ChangePasswordAccountRequest = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

export type BookingServicesRequest = {
  customerId?: number;
  phoneNumber: string;
  idCard: string;
  address: string;
  serviceId: string;
};

export type PaymentDoneRequest = {
  customerId: number;
  requestId: number;
};

export type CreateResultRequest = {
  resultId: string;
  diamondId: string;
  requestId?: number;
  diamondOrigin: string;
  shape: string;
  measurements: string;
  caratWeight: string;
  color: string;
  clarity: string;
  cut: string;
  proportions: string;
  polish: string;
  symmetry: string;
  fluorescence: string;
};
