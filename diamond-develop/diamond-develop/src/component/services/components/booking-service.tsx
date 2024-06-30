import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { Modal, Radio, RadioChangeEvent } from 'antd';

import * as Yup from 'yup';
import { Form, Formik, FormikProps } from 'formik';

import useToast from '@/hooks/use-toast';

import { ID_CARD_REG_EXP, PHONE_REG_EXP } from '@/constant/auth';
import { BookingServicesRequest } from '@/models/account';

import InputField from '@/component/input-field/input-field';
import DiamondButton from '@/component/common/button';
import Loading from '@/component/common/loading/loading';
import PaymentDialog from './payment-dialog';
import { CODE_SUCCESS_2 } from '@/constant/common';
import { bookingServiceApi } from '@/services/account';

type Props = {
  isOpenBookServiceModal: boolean;
  setIsOpenBookServiceModal: Dispatch<SetStateAction<boolean>>;
};

const INIT_VALUES: BookingServicesRequest = {
  phoneNumber: '',
  idCard: '',
  address: '',
  serviceId: '1',
};

const BookingServiceModal = ({ isOpenBookServiceModal, setIsOpenBookServiceModal }: Props) => {
  const { notify } = useToast();

  const validate = Yup.object({
    phoneNumber: Yup.string()
      .matches(PHONE_REG_EXP, 'Số điện thoại không hợp lệ')
      .required('Bắt buộc'),
    idCard: Yup.string().matches(ID_CARD_REG_EXP, 'Không hợp lệ').required('Bắt buộc'),
    address: Yup.string()
      .min(3, 'Tối thiểu 3 ký tự')
      .max(100, 'Tối đa 100 ký tự')
      .required('Bắt buộc'),
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [requestId, setRequestId] = useState(0);
  const [serviceId, setServiceId] = useState(INIT_VALUES.serviceId);

  const formRef = useRef<FormikProps<BookingServicesRequest>>(null);
  const [isOpenPaymentDialog, setIsOpenPaymentDialog] = useState(false);

  useEffect(() => {
    formRef.current?.resetForm();
    isOpenBookServiceModal && setServiceId(INIT_VALUES.serviceId);
  }, [isOpenBookServiceModal]);

  const handleChangeService = (
    e: RadioChangeEvent,
    setFieldValue: (field: string, value: string) => void
  ) => {
    setFieldValue('serviceId', e.target.value);
    setServiceId(e.target.value);
  };

  const handleSubmitForm = async (values: BookingServicesRequest) => {
    const customerId = localStorage.getItem('CUSTOMER_ID');
    setIsLoading(true);
    setIsOpenBookServiceModal(false);
    const res = await bookingServiceApi({ ...values, customerId: Number(customerId) || 0 });

    if (res?.status === CODE_SUCCESS_2) {
      notify('success', 'Đặt lịch thành công, bạn vui lòng thanh toán!');
      setIsOpenPaymentDialog(true);
      setRequestId(res.data.request.requestId);
    } else {
      notify('error', 'Error!');
    }
    setIsLoading(false);
  };

  return (
    <>
      <Loading loading={isLoading} />
      <Formik
        innerRef={formRef}
        initialValues={INIT_VALUES}
        validationSchema={validate}
        onSubmit={handleSubmitForm}
      >
        {({ values, handleSubmit, handleReset, setFieldValue }) => (
          <Form>
            <Modal
              open={isOpenBookServiceModal}
              title='Đặt lịch hẹn'
              okText='Đặt lịch ngay'
              cancelText='Hủy'
              onOk={() => handleSubmit()}
              onCancel={() => setIsOpenBookServiceModal(false)}
              footer={(_, { OkBtn, CancelBtn }) => (
                <>
                  <DiamondButton content='Xóa' type='text' htmlType='reset' onClick={handleReset} />
                  <CancelBtn />
                  <OkBtn />
                </>
              )}
            >
              <div className='form__field'>
                <InputField name='idCard' type='text' placeholder='CCCD/CMND' />
              </div>
              <div className='form__field'>
                <InputField name='phoneNumber' type='text' placeholder='Số điện thoại' />
              </div>
              <div className='form__field'>
                <InputField name='address' type='text' placeholder='Địa chỉ' />
              </div>
              <Radio.Group
                onChange={(e: RadioChangeEvent) => handleChangeService(e, setFieldValue)}
                value={values.serviceId}
              >
                <Radio value='1'>Gói 1</Radio>
                <Radio value='2'>Gói 2</Radio>
                <Radio value='3'>Gói 3</Radio>
              </Radio.Group>
            </Modal>
            <PaymentDialog
              serviceId={serviceId}
              requestId={requestId}
              isOpenPaymentDialog={isOpenPaymentDialog}
              setIsOpenPaymentDialog={setIsOpenPaymentDialog}
            />
          </Form>
        )}
      </Formik>
    </>
  );
};

export default BookingServiceModal;
