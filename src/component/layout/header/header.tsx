import { useEffect, useState } from 'react';
import Link from 'next/link';

import Image from 'next/image';
import { useRouter } from 'next/router';

import { Avatar, Dropdown, Menu, MenuProps, Typography } from 'antd';

import { useDispatch, useSelector } from 'react-redux';
import { selectAuthState, setRenderHeaderInfo } from '@/store/auth-slice';
import useToast from '@/hooks/use-toast';

import { UserOutlined } from '@ant-design/icons';

import DiamondButton from '@/component/common/button';

import logo from '~/assets/images/logo.jpg';
import { ADVANCE_USER_KEY, LIST_ADVANCE_USER, LIST_MENU } from './header.constant';

import './header.scss';
import { logoutApi } from '@/services/auth';
import { CODE_SUCCESS } from '@/constant/common';

export const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { notify } = useToast();

  const authState = useSelector(selectAuthState);

  const [currentTab, setCurrentTab] = useState('mail');
  const [customerName, setCustomerName] = useState('');

  useEffect(() => {
    const name = localStorage.getItem('CUSTOMER_NAME');
    setCustomerName(name || '');
  }, [authState.renderHeaderInfo]);

  const handleClickMenuItem: MenuProps['onClick'] = (e) => {
    setCurrentTab(e.key);
    router.push(e.key);
  };

  const handleToLogin = () => {
    router.push('/login');
  };

  const handleMenuClick: MenuProps['onClick'] = async (e) => {
    if (e.key === ADVANCE_USER_KEY.LOGOUT) {
      const res = await logoutApi();

      if (res?.status === CODE_SUCCESS) {
        notify('success', 'Đăng xuất thành công');
        localStorage.clear();
        router.push('/login');
        dispatch(setRenderHeaderInfo(Date.now()));
      } else {
        notify('error', 'Something error!');
      }
    }
  };

  return (
    <header className='header-outer'>
      <div className='header-inner responsive-wrapper'>
        <div className='d-flex'>
          <Link href='/'>
            <Image src={logo} alt='logo' width={60} height={60} />
          </Link>

          <Menu
            onClick={handleClickMenuItem}
            selectedKeys={[currentTab]}
            mode='horizontal'
            items={LIST_MENU}
            style={{ height: '46px', margin: '4px 0 0 40px' }}
          />
        </div>
        <div className='right-header-container'>
          {customerName ? (
            <Dropdown
              menu={{ items: LIST_ADVANCE_USER, onClick: handleMenuClick }}
              placement='bottom'
            >
              <Typography.Title style={{ cursor: 'pointer' }} level={3}>
                {customerName} <Avatar size={40} icon={<UserOutlined />} />
              </Typography.Title>
            </Dropdown>
          ) : (
            <DiamondButton content='Đăng nhập' onClick={handleToLogin} />
          )}
        </div>
      </div>
    </header>
  );
};
