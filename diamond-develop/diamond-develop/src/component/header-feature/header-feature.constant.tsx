import { MenuProps } from 'antd';

import {
  ContactsOutlined,
  HomeOutlined,
  MoneyCollectOutlined,
  SecurityScanOutlined,
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
    label: 'Dịch vụ',
    key: 'services',
    icon: <MoneyCollectOutlined />,
  },
  {
    label: 'Lịch sử đặt đơn',
    key: 'history-request',
    icon: <ContactsOutlined />,
  },
  {
    label: 'Chính sách',
    key: 'policy',
    icon: <SecurityScanOutlined />,
  },
];

export const ADVANCE_USER_KEY = {
  DETAIL: 'detail',
  LOGOUT: 'logout',
};

export const ADMIN_ADVANCE_USER: MenuProps['items'] = [
  {
    key: ADVANCE_USER_KEY.LOGOUT,
    label: 'Đăng xuất',
  },
];

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
