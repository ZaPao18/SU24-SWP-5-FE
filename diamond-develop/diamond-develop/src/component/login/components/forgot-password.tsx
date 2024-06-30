import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { Modal } from 'antd';
import { Form, Formik, FormikProps } from 'formik';
import * as Yup from 'yup';

import { EMAIL_REG_EXP } from '@/constant/auth';
import InputField from '@/component/input-field/input-field';

import { ForgotPasswordRequest } from '@/models/auth';

type Props = {
  isForgotPasswordModal: boolean;
  setIsForgotPasswordModal: Dispatch<SetStateAction<boolean>>;
  onSubmitForgotPassword: (values: ForgotPasswordRequest) => void;
};

const ForgotPasswordModal = ({
  isForgotPasswordModal,
  setIsForgotPasswordModal,
  onSubmitForgotPassword,
}: Props) => {
  const validate = Yup.object({
    email: Yup.string().matches(EMAIL_REG_EXP, 'Định dạng email sai').required('Bắt buộc'),
  });

  const formRef = useRef<FormikProps<ForgotPasswordRequest>>(null);

  useEffect(() => {
    formRef.current?.resetForm();
  }, [isForgotPasswordModal]);

  return (
    <Formik
      innerRef={formRef}
      initialValues={{ email: '' }}
      validationSchema={validate}
      onSubmit={onSubmitForgotPassword}
    >
      {({ handleSubmit }) => (
        <Form>
          <Modal
            open={isForgotPasswordModal}
            title='Vui lòng nhập email'
            okText='Lấy mã xác nhận'
            cancelText='Hủy'
            onOk={() => handleSubmit()}
            onCancel={() => setIsForgotPasswordModal(false)}
          >
            <div className='form__field'>
              <InputField name='email' type='text' placeholder='Email' />
            </div>
          </Modal>
        </Form>
      )}
    </Formik>
  );
};

export default ForgotPasswordModal;
