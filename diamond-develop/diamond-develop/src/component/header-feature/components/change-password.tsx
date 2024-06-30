import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { Modal, Skeleton } from 'antd';

import * as Yup from 'yup';
import { Form, Formik, FormikProps } from 'formik';
import useToast from '@/hooks/use-toast';

import { CODE_SUCCESS } from '@/constant/common';

import { changePasswordAccountApi } from '@/services/account';
import { ChangePasswordAccountRequest } from '@/models/account';

import InputField from '@/component/input-field/input-field';

const INIT_VALUES: ChangePasswordAccountRequest = {
  currentPassword: '',
  newPassword: '',
  confirmNewPassword: '',
};

type Props = {
  isOpenChangePasswordModal: boolean;
  setIsOpenChangePasswordModal: Dispatch<SetStateAction<boolean>>;
};

const ChangePasswordModal = ({
  isOpenChangePasswordModal,
  setIsOpenChangePasswordModal,
}: Props) => {
  const { notify } = useToast();

  const validate = Yup.object({
    currentPassword: Yup.string().min(8, 'Mật khẩu phải tối thiểu 8 ký tự').required('Bắt buộc'),
    newPassword: Yup.string().min(8, 'Mật khẩu phải tối thiểu 8 ký tự').required('Bắt buộc'),
    confirmNewPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), ''], 'Mật khẩu không khớp')
      .required('Bắt buộc'),
  });

  const formRef = useRef<FormikProps<ChangePasswordAccountRequest>>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    formRef.current?.resetForm();
  }, [isOpenChangePasswordModal]);

  const handleSubmitForm = async (values: ChangePasswordAccountRequest) => {
    setIsLoading(true);
    const res = await changePasswordAccountApi(values);
    if (res?.status === CODE_SUCCESS) {
      notify('success', 'Đổi mật khẩu thành công!');
      setIsOpenChangePasswordModal(false);
    } else {
      notify('error', 'Mật khẩu sai, vui lòng nhập lại!');
    }
    setIsLoading(false);
  };

  return (
    <>
      <Formik
        innerRef={formRef}
        initialValues={INIT_VALUES}
        enableReinitialize
        validationSchema={validate}
        onSubmit={handleSubmitForm}
      >
        {({ handleSubmit }) => (
          <Form>
            <Modal
              width={400}
              open={isOpenChangePasswordModal}
              title='Đổi mật khẩu'
              okText='Đổi mật khẩu'
              cancelText='Hủy'
              onCancel={() => setIsOpenChangePasswordModal(false)}
              onOk={() => handleSubmit()}
            >
              {isLoading ? (
                <Skeleton loading={isLoading} />
              ) : (
                <>
                  <div className='form__field'>
                    <InputField name='currentPassword' type='password' placeholder='Mật khẩu cũ' />
                  </div>
                  <div className='form__field'>
                    <InputField name='newPassword' type='password' placeholder='Mật khẩu mới' />
                  </div>
                  <div className='form__field'>
                    <InputField
                      name='confirmNewPassword'
                      type='password'
                      placeholder='Xác nhận mật khẩu mới'
                    />
                  </div>
                </>
              )}
            </Modal>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ChangePasswordModal;
