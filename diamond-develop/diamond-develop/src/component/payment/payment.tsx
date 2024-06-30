import { useState } from 'react';
import { ChevronRight } from 'react-bootstrap-icons';
import { useRouter } from 'next/navigation';

import './payment.scss';
import FormButton from '../common/form-button/form-button';
import Modal from '../layout/header/exam-header/modal/modal';
import Image from 'next/image';

const LIST_OPTION_PAYMENT = [
  {
    title: 'Gói 1',
    description: 'Bạn sẽ được trải nghiệm bộ 10 đề thi chuẩn nhất hiện nay',
  },
  {
    title: 'Gói 2',
    description: 'Bạn sẽ được trải nghiệm bộ 20 đề thi chuẩn nhất hiện nay',
  },
  {
    title: 'Gói 3',
    description: 'Bạn sẽ được trải nghiệm bộ 30 đề thi chuẩn nhất hiện nay',
  },
];

const PaymentItem = ({ title, description }: { title: string; description: string }) => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);

  const handleToPay = () => {
    setIsShowModal(true);
  };
  return (
    <>
      <h2>{title}</h2>
      <p>{description}</p>
      <FormButton
        icon={<ChevronRight />}
        text='Đăng ký ngay'
        style={{ width: '180px' }}
        onClick={handleToPay}
      />
      <Modal
        isOpen={isShowModal}
        setIsOpen={setIsShowModal}
        headerTitle='Thanh toán ngay'
        content={<Image src='https://tuanm.dev/r/qr' width={340} height={400} alt='' />}
        cancelTitle='Close'
      />
    </>
  );
};

const Payment = () => {
  const router = useRouter();

  const handleBackToListExam = () => {
    router.push('/list-exam');
  };

  return (
    <div className='payment-container d-flex d-flex justify-content-center align-items-center flex-column'>
      <div className='payment-inner d-flex justify-content-center align-items-center'>
        {LIST_OPTION_PAYMENT.map((item, index) => (
          <div key={index} className='d-flex flex-column p-4 m-4 payment-item'>
            <PaymentItem title={item.title} description={item.description} />
          </div>
        ))}
      </div>
      <FormButton
        icon={<ChevronRight />}
        text='Quay trở lại trang thi'
        style={{ width: '240px' }}
        onClick={handleBackToListExam}
      />
    </div>
  );
};

export default Payment;
