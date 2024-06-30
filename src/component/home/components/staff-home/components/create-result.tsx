import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { Modal, Radio, RadioChangeEvent } from 'antd';

import * as Yup from 'yup';
import { Form, Formik, FormikProps } from 'formik';

import useToast from '@/hooks/use-toast';

import { ID_CARD_REG_EXP, PHONE_REG_EXP } from '@/constant/auth';
import { CreateResultRequest } from '@/models/account';

import InputField from '@/component/input-field/input-field';
import DiamondButton from '@/component/common/button';
import Loading from '@/component/common/loading/loading';
import { CODE_SUCCESS } from '@/constant/common';
import { createResultApi } from '@/services/staff';

const LIST_INPUT = [
  [
    {
      name: 'requestId',
      placeholder: 'Mã yêu cầu',
      isDisabled: true,
    },
    {
      name: 'resultId',
      placeholder: 'Mã kết quả',
    },
  ],
  [
    {
      name: 'diamondId',
      placeholder: 'Mã kim cương',
    },
    {
      name: 'diamondOrigin',
      placeholder: 'Nguồn gốc kim cương',
    },
  ],
  [
    {
      name: 'shape',
      placeholder: 'Hình dạng',
    },
    {
      name: 'measurements',
      placeholder: 'Kích thước',
    },
  ],
  [
    {
      name: 'caratWeight',
      placeholder: 'Trọng lượng carat',
    },
    {
      name: 'color',
      placeholder: 'Màu sắc',
    },
  ],
  [
    {
      name: 'clarity',
      placeholder: 'Độ trong',
    },
    {
      name: 'cut',
      placeholder: 'Chất lượng cắt',
    },
  ],
  [
    {
      name: 'proportions',
      placeholder: 'Tỷ lệ',
    },
    {
      name: 'polish',
      placeholder: 'Đánh bóng',
    },
  ],
  [
    {
      name: 'symmetry',
      placeholder: 'Đối xứng',
    },
    {
      name: 'fluorescence',
      placeholder: 'Độ huỳnh quang',
    },
  ],
];

const INIT_VALUES: CreateResultRequest = {
  caratWeight: '',
  diamondId: '',
  resultId: '',
  diamondOrigin: '',
  shape: '',
  measurements: '',
  color: '',
  clarity: '',
  cut: '',
  proportions: '',
  polish: '',
  symmetry: '',
  fluorescence: '',
};

type Props = {
  requestId: number;
  isOpenCreateResultModal: boolean;
  setIsOpenCreateResultModal: Dispatch<SetStateAction<boolean>>;
  setLoadDataRequestAcceptedKey?: Dispatch<SetStateAction<number>>;
};

const CreateResultModal = ({
  requestId,
  isOpenCreateResultModal,
  setIsOpenCreateResultModal,
  setLoadDataRequestAcceptedKey,
}: Props) => {
  const { notify } = useToast();

  const validate = Yup.object({
    resultId: Yup.string().required('Bắt buộc'),
    diamondId: Yup.string().required('Bắt buộc'),
    diamondOrigin: Yup.string().required('Bắt buộc'),
    shape: Yup.string().required('Bắt buộc'),
    measurements: Yup.string().required('Bắt buộc'),
    caratWeight: Yup.string().required('Bắt buộc'),
    color: Yup.string().required('Bắt buộc'),
    clarity: Yup.string().required('Bắt buộc'),
    cut: Yup.string().required('Bắt buộc'),
    proportions: Yup.string().required('Bắt buộc'),
    polish: Yup.string().required('Bắt buộc'),
    symmetry: Yup.string().required('Bắt buộc'),
    fluorescence: Yup.string().required('Bắt buộc'),
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formRef = useRef<FormikProps<CreateResultRequest>>(null);

  useEffect(() => {
    formRef.current?.resetForm();
  }, [isOpenCreateResultModal]);

  const handleSubmitForm = async (values: CreateResultRequest) => {
    setIsLoading(true);
    setIsOpenCreateResultModal(false);
    const res = await createResultApi({ ...values });

    if (res?.status === CODE_SUCCESS) {
      notify('success', 'Tạo đơn kết quả thành công, vui lòng đợi Admin kiểm duyệt!');
      setLoadDataRequestAcceptedKey?.(Date.now());
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
        enableReinitialize
        initialValues={{ ...INIT_VALUES, requestId }}
        validationSchema={validate}
        onSubmit={handleSubmitForm}
      >
        {({ values, handleSubmit, handleReset, setFieldValue }) => (
          <Form>
            <Modal
              open={isOpenCreateResultModal}
              title='Tạo đơn kết quả'
              okText='Gửi đơn'
              cancelText='Hủy'
              width={600}
              onOk={() => handleSubmit()}
              onCancel={() => setIsOpenCreateResultModal(false)}
              footer={(_, { OkBtn, CancelBtn }) => (
                <>
                  <DiamondButton content='Xóa' type='text' htmlType='reset' onClick={handleReset} />
                  <CancelBtn />
                  <OkBtn />
                </>
              )}
            >
              {LIST_INPUT.map((item, index) => (
                <div key={index} className='d-flex align-items-center gap-3'>
                  {item.map((ele) => (
                    <div className='form__field' style={{ width: '50%', margin: '20px 0' }}>
                      <InputField
                        disabled={ele.isDisabled}
                        name={ele.name}
                        type='text'
                        placeholder={ele.placeholder}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </Modal>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CreateResultModal;
