import { Dispatch, SetStateAction, useState } from 'react';
import { Image, Modal, Typography } from 'antd';
import useToast from '@/hooks/use-toast';

import {
  transformCost,
  transformServiceBooking,
} from '@/component/history-request/history-request.utils';
import Loading from '@/component/common/loading/loading';
import { paymentDoneApi } from '@/services/account';
import { CODE_SUCCESS } from '@/constant/common';

type Props = {
  serviceId: string;
  requestId: number;
  isOpenPaymentDialog: boolean;
  setIsOpenPaymentDialog: Dispatch<SetStateAction<boolean>>;
  setLoadDataKey?: Dispatch<SetStateAction<number>>;
};

const PaymentDialog = ({
  serviceId,
  requestId,
  isOpenPaymentDialog,
  setIsOpenPaymentDialog,
  setLoadDataKey,
}: Props) => {
  const { notify } = useToast();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handlePaymentDone = async () => {
    const customerId = localStorage.getItem('CUSTOMER_ID');
    setIsLoading(true);
    setIsOpenPaymentDialog(false);
    const res = await paymentDoneApi({ requestId, customerId: Number(customerId) || 0 });

    if (res?.status === CODE_SUCCESS) {
      notify('success', 'Thanh toán thành công!');
      setLoadDataKey?.(Date.now());
    } else {
      notify('error', 'Error!');
    }
    setIsLoading(false);
  };

  return (
    <>
      <Loading loading={isLoading} />

      <Modal
        width={400}
        open={isOpenPaymentDialog}
        title='Thanh toán'
        okText='Đã thanh toán'
        cancelText='Hủy'
        onOk={handlePaymentDone}
        onCancel={() => setIsOpenPaymentDialog(false)}
      >
        <Image
          width={350}
          height={350}
          src='https://static01.nyt.com/images/2024/03/05/autossell/00TB-MEOWS/00TB-MEOWS-square640.jpg'
        />
        <Typography.Title level={5}>
          {`Bạn đã đăng ký *Gói ${Number(serviceId)}: ${transformServiceBooking(
            serviceId
          )}* với số tiền cần phải thanh toán là là ${transformCost(serviceId)}`}
        </Typography.Title>
      </Modal>
    </>
  );
};

export default PaymentDialog;
