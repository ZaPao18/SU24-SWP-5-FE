import { Space, TableProps } from 'antd';

import CustomTable from '../../custom-table/custom-table';
import DiamondButton from '@/component/common/button';
import { Customer } from '@/models/account';

type Props = {
  dataSource: Customer[];
};

const ListCustomerTable = ({ dataSource }: Props) => {
  const customerColumns: TableProps<Customer>['columns'] = [
    {
      title: 'Id',
      dataIndex: 'customerId',
      key: 'customerId',
      width: 100,
    },
    {
      title: 'Tên khách hàng',
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      title: 'CMND/CCCD',
      dataIndex: 'idCard',
      key: 'idCard',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  return (
    <div className='d-flex flex-column'>
      <CustomTable columns={customerColumns} dataSource={dataSource} />
    </div>
  );
};

export default ListCustomerTable;
