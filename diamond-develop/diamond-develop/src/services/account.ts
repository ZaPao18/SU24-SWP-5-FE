import {
  AccountDetailRequest,
  BookingServicesRequest,
  ChangePasswordAccountRequest,
  PaymentDoneRequest,
} from '@/models/account';
import api from '../api';

export const getListCustomersApi = async () => {
  try {
    const res = await api.get('api/Account/list-customers');
    return res;
  } catch (error) {
    return undefined;
  }
};

export const getListEmployeeApi = async () => {
  try {
    const res = await api.get('api/Account/list-employees-except-role1');
    return res;
  } catch (error) {
    return undefined;
  }
};

export const getDetailAccountCustomerApi = async (id: number) => {
  try {
    const res = await api.get(`api/Profile/customer/${id}`);
    return res;
  } catch (error) {
    return undefined;
  }
};

export const updateDetailAccountCustomerApi = async (payload: AccountDetailRequest) => {
  try {
    const { customerId, ...request } = payload;
    const res = await api.post(`api/Profile/update-profile/${customerId}`, { ...request });
    return res;
  } catch (error) {
    return undefined;
  }
};

export const changePasswordAccountApi = async (payload: ChangePasswordAccountRequest) => {
  try {
    const res = await api.put('api/Profile/change-password', { ...payload });
    return res;
  } catch (error) {
    return undefined;
  }
};

export const bookingServiceApi = async (payload: BookingServicesRequest) => {
  try {
    const res = await api.post('api/CreateRequests/CreateRequest', { ...payload });
    return res;
  } catch (error) {
    return undefined;
  }
};

export const paymentDoneApi = async (payload: PaymentDoneRequest) => {
  try {
    const res = await api.post('api/Payment/UpdatePaymentStatus', { ...payload });
    return res;
  } catch (error) {
    return undefined;
  }
};

export const getListBookingCustomerApi = async (id: number) => {
  try {
    const res = await api.get(`api/HistoryofRequest/ByCustomer/${id}`);
    return res;
  } catch (error) {
    return undefined;
  }
};

export const getListResultApi = async () => {
  try {
    const res = await api.get('api/ListAllResult/list-results');
    return res;
  } catch (error) {
    return undefined;
  }
};

export const acceptResultApi = async (requestId: number) => {
  try {
    const res = await api.put(`api/ListAllResult/update-request-status/${requestId}`);
    return res;
  } catch (error) {
    return undefined;
  }
};
