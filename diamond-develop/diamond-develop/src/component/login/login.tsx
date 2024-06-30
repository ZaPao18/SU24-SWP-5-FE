import { useState } from 'react';
import Link from 'next/link';

import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import { MailOutlined, UnlockOutlined } from '@ant-design/icons';

import useToast from '@/hooks/use-toast';

import { ForgotPasswordRequest, LoginType, ResetPasswordRequest } from '@/models/auth';
import { EMAIL_REG_EXP } from '@/constant/auth';
import InputField from '../input-field/input-field';

import './login.scss';
import DiamondButton from '../common/button';
import ForgotPasswordModal from './components/forgot-password';
import { forgotPasswordApi, resetPasswordApi } from '@/services/auth';
import { CODE_SUCCESS } from '@/constant/common';
import Loading from '../common/loading/loading';
import ResetPasswordModal from './components/reset-password';

type Props = {
  onClickLogin: (payload: LoginType) => void;
};

const Login = ({ onClickLogin }: Props) => {
  const { notify } = useToast();

  const validate = Yup.object({
    email: Yup.string().matches(EMAIL_REG_EXP, 'Định dạng email sai').required('Bắt buộc'),
    password: Yup.string().min(8, 'Mật khẩu có ít nhất 8 ký tự').required('Bắt buộc'),
  });

  const [isForgotPasswordModal, setIsForgotPasswordModal] = useState(false);
  const [isResetPasswordModal, setIsResetPasswordModal] = useState(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmitForgotPassword = async (values: ForgotPasswordRequest) => {
    setIsForgotPasswordModal(false);
    setIsLoading(true);

    const res = await forgotPasswordApi({ ...values });

    if (res?.status === CODE_SUCCESS) {
      setIsResetPasswordModal(true);
    } else {
      notify('error', 'Something error!');
    }

    setIsLoading(false);
  };

  const handleSubmitResetPassword = async (values: ResetPasswordRequest) => {
    if (values.resetCode.length < 6) return;
    setIsResetPasswordModal(false);

    setIsLoading(true);
    const res = await resetPasswordApi({ ...values });

    if (res?.status === CODE_SUCCESS) {
      notify('success', 'Đổi mật khẩu thành công!');
    } else {
      notify('error', 'Something error!');
    }

    setIsLoading(false);
  };

  return (
    <>
      <Loading loading={isLoading} />
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={validate}
        onSubmit={(values) => onClickLogin(values)}
      >
        {() => (
          <div className='d-flex justify-content-center'>
            <div className='form-container login-form'>
              <div className='form__content'>
                <Form>
                  <div className='login'>
                    <h1 className='my-4 font-weight-bold'>Đăng nhập</h1>
                    <div className='form__field'>
                      <InputField
                        name='email'
                        type='text'
                        placeholder='Email'
                        prefix={<MailOutlined />}
                      />
                    </div>
                    <div className='form__field'>
                      <InputField
                        name='password'
                        type='password'
                        placeholder='Mật khẩu'
                        prefix={<UnlockOutlined />}
                      />
                    </div>

                    <DiamondButton
                      content='Đăng nhập'
                      width='100%'
                      size='large'
                      className='mt-2'
                      htmlType='submit'
                    />

                    <div className='my-4'>
                      <Link href='/register' style={{ color: '#000' }}>
                        Bạn chưa có tài khoản?
                      </Link>
                    </div>
                    <DiamondButton
                      content='Quên mật khẩu?'
                      type='default'
                      onClick={() => setIsForgotPasswordModal(true)}
                    />
                  </div>
                </Form>
              </div>

              <ForgotPasswordModal
                isForgotPasswordModal={isForgotPasswordModal}
                setIsForgotPasswordModal={setIsForgotPasswordModal}
                onSubmitForgotPassword={handleSubmitForgotPassword}
              />

              <ResetPasswordModal
                isResetPasswordModal={isResetPasswordModal}
                setIsResetPasswordModal={setIsResetPasswordModal}
                onSubmitResetPassword={handleSubmitResetPassword}
              />

              <div className='screen__background'>
                <span className='screen__background__shape screen__background__shape4'></span>
                <span className='screen__background__shape screen__background__shape3'></span>
                <span className='screen__background__shape screen__background__shape2'></span>
                <span className='screen__background__shape screen__background__shape1'></span>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </>
  );
};

export default Login;
