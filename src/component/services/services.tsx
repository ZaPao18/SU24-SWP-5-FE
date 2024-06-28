import { useEffect, useRef, useState } from 'react';
import { Card, Modal } from 'antd';

import * as Yup from 'yup';
import { Form, Formik, FormikProps } from 'formik';

import DiamondButton from '../common/button';
import InputField from '../input-field/input-field';
import { ServicesForm } from './services.model';
import { PHONE_REG_EXP } from '@/constant/auth';

const LIST_SERVICES = [
  {
    title: 'Gói 1',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
    price: '1.000.000đ',
    package: '1',
  },
  {
    title: 'Gói 2',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
    price: '2.000.000đ',
    package: '2',
  },
  {
    title: 'Gói 3',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
    price: '3.000.000đ',
    package: '3',
  },
];

const INIT_VALUES: ServicesForm = {
  customerName: '',
  phoneNumber: '',
  idCard: '',
  address: '',
};

const Services = () => {
  const validate = Yup.object({
    customerName: Yup.string()
      .min(3, 'Tối thiểu 3 ký tự')
      .max(50, 'Tối đa 50 ký tự')
      .required('Bắt buộc'),
    phoneNumber: Yup.string()
      .matches(PHONE_REG_EXP, 'Số điện thoại không hợp lệ')
      .required('Bắt buộc'),
    idCard: Yup.string()
      .min(6, 'Tối thiểu 6 ký tự')
      .max(18, 'Tối đa 18 ký tự')
      .required('Bắt buộc'),
    address: Yup.string()
      .min(3, 'Tối thiểu 3 ký tự')
      .max(100, 'Tối đa 100 ký tự')
      .required('Bắt buộc'),
  });

  const formRef = useRef<FormikProps<ServicesForm>>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    formRef.current?.resetForm();
  }, [isModalOpen]);

  const handleShowModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmitForm = (values: ServicesForm) => {
    console.log(values);
  };

  return (
    <>
      <div className='d-flex gap-4'>
        {LIST_SERVICES.map((item) => (
          <Card key={item.package} title={item.title}>
            <p>{item.description}</p>
            <p>{item.price}</p>
            <DiamondButton content='Đặt lịch ngay' onClick={handleShowModal} />
          </Card>
        ))}
      </div>

      <Formik
        innerRef={formRef}
        initialValues={INIT_VALUES}
        validationSchema={validate}
        onSubmit={handleSubmitForm}
      >
        {({ handleSubmit, handleReset }) => (
          <Form>
            <Modal
              open={isModalOpen}
              title='Đặt lịch hẹn'
              okText='Đặt lịch ngay'
              cancelText='Hủy'
              onOk={() => handleSubmit()}
              onCancel={handleCancel}
              footer={(_, { OkBtn, CancelBtn }) => (
                <>
                  <DiamondButton
                    content='Xóa'
                    type='default'
                    htmlType='reset'
                    onClick={handleReset}
                  />
                  <CancelBtn />
                  <OkBtn />
                </>
              )}
            >
              <div className='form__field'>
                <InputField name='customerName' type='text' placeholder='Tên đầy đủ' />
              </div>
              <div className='form__field'>
                <InputField name='phoneNumber' type='text' placeholder='Số điện thoại' />
              </div>
              <div className='form__field'>
                <InputField name='idCard' type='text' placeholder='CCCD/CMND' />
              </div>
              <div className='form__field'>
                <InputField name='address' type='text' placeholder='Địa chỉ' />
              </div>
            </Modal>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Services;
