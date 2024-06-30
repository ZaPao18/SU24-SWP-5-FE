import { useEffect, useState } from 'react';
import { Space, TableProps, Tabs, TabsProps } from 'antd';

import useToast from '@/hooks/use-toast';

import { CODE_SUCCESS } from '@/constant/common';
import { getListCustomersApi, getListEmployeeApi, getListResultApi } from '@/services/account';
import Loading from '@/component/common/loading/loading';

import DiamondButton from '@/component/common/button';
import { Customer, Employee } from '@/models/account';
import CustomTable from '../custom-table/custom-table';
import { TAB_ADMIN_KEY } from '../../home.constant';
import { transformListResultData } from '../staff-home/staff-home.utils';
import { ListResult } from '../staff-home/staff-home.model';
import ListResultTable from '../staff-home/components/list-result';

const AdminHome = () => {
  const { notify } = useToast();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [listCustomers, setListCustomers] = useState<Customer[]>([]);
  const [listEmployees, setListEmployees] = useState<Employee[]>([]);
  const [listResult, setListResult] = useState<ListResult[]>([]);
  const [loadListResultKey, setLoadListResultKey] = useState(0);

  const employeeColumns: TableProps<Employee>['columns'] = [
    {
      title: 'Id',
      dataIndex: 'employeeId',
      key: 'employeeId',
      width: 100,
    },
    {
      title: 'Tên nhân viên',
      dataIndex: 'employeeName',
      key: 'employeeName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Action',
      key: '',
      render: (_, record) => (
        <Space size='middle'>
          <DiamondButton danger content='Xóa' />
        </Space>
      ),
    },
  ];

  const getListResult = async () => {
    setIsLoading(true);
    const res = await getListResultApi();
    if (res?.status === CODE_SUCCESS) {
      const dataSourceRevert = transformListResultData(res.data);
      setListResult(dataSourceRevert);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const getListCustomers = async () => {
      setIsLoading(true);
      await Promise.all([getListCustomersApi(), getListEmployeeApi()])
        .then((res) => {
          setListCustomers(res[0]?.data);
          setListEmployees(res[1]?.data);
        })
        .catch(() => {
          notify('error', 'Something error!');
        });
      setIsLoading(false);
    };
    getListCustomers();
  }, []);

  useEffect(() => {
    getListResult();
  }, [loadListResultKey]);

  const LIST_ACTION_TAB: TabsProps['items'] = [
    {
      key: TAB_ADMIN_KEY.EMPLOYEES,
      label: 'Danh sách nhân viên',
      children: <CustomTable columns={employeeColumns} dataSource={listEmployees} />,
    },
    {
      key: TAB_ADMIN_KEY.REQUEST_ORDER,
      label: 'Danh sách đơn kiểm định cần duyệt',
      children: (
        <ListResultTable
          isAdmin
          dataSource={listResult}
          setLoadListResultKey={setLoadListResultKey}
        />
      ),
    },
  ];

  return (
    <>
      <Loading loading={isLoading} />
      <Tabs defaultActiveKey={TAB_ADMIN_KEY.CUSTOMERS} items={LIST_ACTION_TAB} />
    </>
  );
};

export default AdminHome;
