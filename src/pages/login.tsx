import { useState } from 'react';
import { useRouter } from 'next/router';

import { useDispatch } from 'react-redux';
import { setRenderHeaderInfo } from '@/store/auth-slice';
import useToast from '@/hooks/use-toast';

import Loading from '@/component/common/loading/loading';
import Login from '@/component/login/login';

import { LoginType } from '@/models/auth';
import { loginApi } from '@/services/auth';
import { CODE_SUCCESS } from '@/constant/common';

import { setDataLocalStorage } from '@/utils/utils';

const SignInPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { notify } = useToast();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogin = async (values: LoginType) => {
    setIsLoading(true);
    const res = await loginApi({ ...values });

    if (res?.status === CODE_SUCCESS) {
      notify('success', 'Đăng nhập thành công');
      setDataLocalStorage(res.data);
      router.push('/');
      dispatch(setRenderHeaderInfo(Date.now()));
    } else {
      notify('error', 'Email hoặc mật khẩu sai!');
    }
    setIsLoading(false);
  };

  return (
    <div className='page-container'>
      <div className='page-content'>
        <Loading loading={isLoading} />
        <Login onClickLogin={handleLogin} />
      </div>
    </div>
  );
};

export default SignInPage;
