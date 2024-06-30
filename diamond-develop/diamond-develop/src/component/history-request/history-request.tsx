import { useEffect, useState } from 'react';
import { Space, Table, TableProps } from 'antd';

import { HistoryRequestCustomer } from './history-request.model';
import DiamondButton from '../common/button';
import { SETTING_SCROLL_TABLE } from '../home/home.constant';
import Loading from '../common/loading/loading';
import { getListBookingCustomerApi } from '@/services/account';
import { CODE_SUCCESS } from '@/constant/common';
import { transformServiceBooking } from './history-request.utils';
import PaymentDialog from '../services/components/payment-dialog';

const WAIT_TO_PAY = 'Chờ thanh toán';

const HistoryRequest = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<HistoryRequestCustomer[]>([]);

  const [isOpenPaymentDialog, setIsOpenPaymentDialog] = useState(false);
  const [loadDataKey, setLoadDataKey] = useState(0);
  const [requestId, setRequestId] = useState(0);
  const [serviceId, setServiceId] = useState('1');

  const handleOpenDialogPayment = (rowData: HistoryRequestCustomer) => {
    setRequestId(rowData.requestId);
    setServiceId(rowData.serviceId);
    setIsOpenPaymentDialog(true);
  };

  const historyColumns: TableProps<HistoryRequestCustomer>['columns'] = [
    {
      title: '#',
      dataIndex: 'id',
      key: 'id',
      width: 100,
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Địa chỉ đặt đơn',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Gói',
      dataIndex: 'serviceId',
      key: 'serviceId',
      render: (_, rowData) => <div>{transformServiceBooking(rowData.serviceId)}</div>,
    },
    {
      title: 'Trạng thái đơn',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Action',
      key: '',
      render: (_, rowData) => (
        <>
          {rowData.status === WAIT_TO_PAY ? (
            <Space size='middle'>
              <DiamondButton
                content='Thanh toán ngay'
                onClick={() => handleOpenDialogPayment(rowData)}
              />
            </Space>
          ) : (
            <>Bạn đã thanh toán</>
          )}
        </>
      ),
    },
  ];

  const getData = async () => {
    const customerId = localStorage.getItem('CUSTOMER_ID');
    setIsLoading(true);
    const res = await getListBookingCustomerApi(Number(customerId) || 0);
    if (res?.status === CODE_SUCCESS) {
      const dataSoureRevert = res.data.map((item: any, index: number) => ({
        id: index + 1,
        phoneNumber: item.phoneNumber,
        address: item.address,
        serviceId: item.serviceId,
        status: item.status,
        requestId: item.requestId,
      }));
      setDataSource(dataSoureRevert);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, [loadDataKey]);

  return (
    <>
      <Loading loading={isLoading} />
      <Table columns={historyColumns} dataSource={dataSource} scroll={SETTING_SCROLL_TABLE} />
      <PaymentDialog
        serviceId={serviceId}
        requestId={requestId}
        isOpenPaymentDialog={isOpenPaymentDialog}
        setIsOpenPaymentDialog={setIsOpenPaymentDialog}
        setLoadDataKey={setLoadDataKey}
      />
    </>
  );
};

export default HistoryRequest;
