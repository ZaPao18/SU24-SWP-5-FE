import { transformServiceBooking } from '@/component/history-request/history-request.utils';
import { ListRequest, ListResult } from './staff-home.model';

export const transformListRequestData = (data: any) => {
  let result: ListRequest[] = [];
  result = data.map((item: any) => ({
    requestId: item.requestId,
    customerId: item.customer.customerId,
    customerName: item.customer.customerName,
    idCard: item.customer.idCard,
    email: item.customer.email,
    phoneNumber: item.customer.phoneNumber,
    address: item.customer.address,
    serviceId: transformServiceBooking(item.serviceId),
    status: item.status,
  }));
  return result;
};

export const transformListResultData = (data: any) => {
  let result: ListResult[] = [];
  result = data.map((item: any) => ({
    requestStatus: item.requestStatus,
    resultId: item.resultId,
    diamondId: item.diamondId,
    requestId: item.requestId,
    diamondOrigin: item.diamondOrigin,
    shape: item.shape,
    measurements: item.measurements,
    caratWeight: item.caratWeight,
    color: item.color,
    clarity: item.clarity,
    cut: item.cut,
    proportions: item.proportions,
    polish: item.polish,
    symmetry: item.symmetry,
    fluorescence: item.fluorescence,
  }));
  return result;
};
