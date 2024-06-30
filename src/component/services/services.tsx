import { useState } from 'react';
import { Card } from 'antd';

import DiamondButton from '../common/button';
import BookingServiceModal from './components/booking-service';

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

const Services = () => {
  const [isOpenBookServiceModal, setIsOpenBookServiceModal] = useState(false);

  const handleShowModal = () => {
    setIsOpenBookServiceModal(true);
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

        <BookingServiceModal
          isOpenBookServiceModal={isOpenBookServiceModal}
          setIsOpenBookServiceModal={setIsOpenBookServiceModal}
        />
      </div>
    </>
  );
};

export default Services;
