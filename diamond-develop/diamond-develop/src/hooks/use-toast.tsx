import { notification } from 'antd';
import { useCallback } from 'react';

const useToast = () => {
  const notify = useCallback((type: 'success' | 'info' | 'error' | 'warning', message: string) => {
    notification[type]({
      message,
      placement: 'topRight',
    });
  }, []);

  return { notify };
};

export default useToast;
