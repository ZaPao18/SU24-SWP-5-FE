import { useState } from 'react';
import { useRouter } from 'next/router';

import { useDispatch } from 'react-redux';
import { setRenderHeaderInfo } from '@/store/auth-slice';
import useToast from '@/hooks/use-toast';

import Loading from '@/component/common/loading/loading';
import Register from '@/component/register/register';
import { RegisterType } from '@/models/auth';

import { registerApi, verifyEmailApi } from '@/services/auth';
import { CODE_SUCCESS } from '@/constant/common';
import { setDataLocalStorage } from '@/utils/utils';

const RegisterPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { notify } = useToast();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isVerify, setIsVerify] = useState<boolean>(false);

  const handleRegister = async (values: RegisterType) => {
    setIsLoading(true);
    const res = await registerApi({ ...values });

    if (res?.status === CODE_SUCCESS) {
      notify('info', 'Vui lòng nhập mã xác nhận');
      setIsVerify(true);
    } else {
      notify('error', 'Email đã được đăng ký!');
    }
    setIsLoading(false);
  };

  const handleVerifyMail = async (confirmationCode: string) => {
    if (confirmationCode.length < 6) return;

    setIsLoading(true);
    const res = await verifyEmailApi({ confirmationCode });

    if (res?.status === CODE_SUCCESS) {
      notify('success', 'Xác nhận thành công');
      setDataLocalStorage(res.data);
      router.push('/');
      dispatch(setRenderHeaderInfo(Date.now()));
    } else {
      notify('error', 'Mã xác nhận sai!');
    }
    setIsLoading(false);
  };

  return (
    <div className='page-container'>
      <div className='page-content'>
        <Loading loading={isLoading} />
        <Register isVerify={isVerify} onRegister={handleRegister} onVerifyMail={handleVerifyMail} />
      </div>
    </div>
  );
};

export default RegisterPage;
