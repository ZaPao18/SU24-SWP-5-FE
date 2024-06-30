import { MailOutlined, PhoneOutlined } from '@ant-design/icons';
import './footer.scss';
import { Typography } from 'antd';

const Footer = () => {
  return (
    <footer className='footer-container'>
      <Typography.Title level={3}>Super Diamond</Typography.Title>
      <div className='mt-2'>
        <PhoneOutlined /> (+84) 39999999
      </div>
      <div className='mt-2'>
        <MailOutlined /> test@gmail.com
      </div>
      <div className='mt-2'>© 2024. Super Diamond nơi kiểm định kim cương hàng đầu Việt Nam</div>
    </footer>
  );
};

export default Footer;
