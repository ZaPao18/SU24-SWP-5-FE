import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { Input, Modal, Typography } from 'antd';

import { Form, Formik, FormikProps } from 'formik';
import * as Yup from 'yup';

import { ResetPasswordRequest } from '@/models/auth';
import InputField from '@/component/input-field/input-field';

type Props = {
  isResetPasswordModal: boolean;
  setIsResetPasswordModal: Dispatch<SetStateAction<boolean>>;
  onSubmitResetPassword: (values: ResetPasswordRequest) => void;
};

const ResetPasswordModal = ({
  isResetPasswordModal,
  setIsResetPasswordModal,
  onSubmitResetPassword,
}: Props) => {
  const validate = Yup.object({
    resetCode: Yup.string().required('Bắt buộc'),
    newPassword: Yup.string().min(8, 'Mật khẩu phải tối thiểu 8 ký tự').required('Bắt buộc'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), ''], 'Mật khẩu không khớp')
      .required('Bắt buộc'),
  });

  const formRef = useRef<FormikProps<ResetPasswordRequest>>(null);

  useEffect(() => {
    formRef.current?.resetForm();
  }, [isResetPasswordModal]);

  return (
    <Formik
      innerRef={formRef}
      initialValues={{ resetCode: '', newPassword: '', confirmPassword: '' }}
      validationSchema={validate}
      enableReinitialize
      onSubmit={onSubmitResetPassword}
    >
      {({ values, handleSubmit, setFieldValue }) => (
        <Form>
          <Modal
            open={isResetPasswordModal}
            title='Đổi mật khẩu'
            okText='Đổi mật khẩu'
            cancelText='Hủy'
            onOk={() => handleSubmit()}
            onCancel={() => setIsResetPasswordModal(false)}
          >
            <div className='form__field d-flex flex-column align-items-baseline'>
              <Typography.Title level={5}>Mã xác nhận</Typography.Title>
              <Input.OTP
                value={values.resetCode}
                length={6}
                onChange={(code) => setFieldValue('resetCode', code)}
              />
            </div>
            <div className='form__field'>
              <InputField name='newPassword' type='password' placeholder='Mật khẩu mới' />
            </div>
            <div className='form__field'>
              <InputField name='confirmPassword' type='password' placeholder='Xác nhận mật khẩu' />
            </div>
          </Modal>
        </Form>
      )}
    </Formik>
  );
};

export default ResetPasswordModal;
