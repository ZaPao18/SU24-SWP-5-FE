import { MenuProps } from 'antd';

import {
  ContactsOutlined,
  HomeOutlined,
  MoneyCollectOutlined,
  SmileOutlined,
  SolutionOutlined,
} from '@ant-design/icons';

type MenuItem = Required<MenuProps>['items'][number];

export const LIST_MENU: MenuItem[] = [
  {
    label: 'Trang chủ',
    key: '/',
    icon: <HomeOutlined />,
  },
  {
    label: 'Giới thiệu',
    key: 'introduce',
    icon: <SolutionOutlined />,
  },
  {
    label: 'Blogs',
    key: 'blogs',
    icon: <SmileOutlined />,
  },
  {
    label: 'Dịch vụ',
    key: 'services',
    icon: <MoneyCollectOutlined />,
  },
  {
    label: 'Liên hệ',
    key: 'contact',
    icon: <ContactsOutlined />,
  },
];

export const ADVANCE_USER_KEY = {
  DETAIL: 'detail',
  LOGOUT: 'logout',
};

export const LIST_ADVANCE_USER: MenuProps['items'] = [
  {
    key: ADVANCE_USER_KEY.DETAIL,
    label: 'Xem chi tiết tài khoản',
  },
  {
    key: ADVANCE_USER_KEY.LOGOUT,
    label: 'Đăng xuất',
  },
];
