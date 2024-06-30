import { Dispatch, SetStateAction, useState } from 'react';
import { Popconfirm, Space, TableProps } from 'antd';

import CustomTable from '../../custom-table/custom-table';
import { ListRequest } from '../staff-home.model';
import DiamondButton from '@/component/common/button';
import { updateStatusWhenReceivedDiamondApi } from '@/services/staff';
import Loading from '@/component/common/loading/loading';
import useToast from '@/hooks/use-toast';
import { CODE_SUCCESS } from '@/constant/common';
import CreateResultModal from './create-result';

type Props = {
  isRequestAccepted?: boolean;
  dataSource: ListRequest[];
  setLoadDataRequestKey?: Dispatch<SetStateAction<number>>;
  setLoadDataRequestAcceptedKey?: Dispatch<SetStateAction<number>>;
};

const ListRequestTable = ({
  isRequestAccepted,
  dataSource,
  setLoadDataRequestKey,
  setLoadDataRequestAcceptedKey,
}: Props) => {
  const { notify } = useToast();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpenCreateResultModal, setIsOpenCreateResultModal] = useState<boolean>(false);
  const [requestId, setRequestId] = useState(0);

  const handleAcceptRequest = async (requestId: number) => {
    setIsLoading(true);
    const res = await updateStatusWhenReceivedDiamondApi(requestId);

    if (res?.status === CODE_SUCCESS) {
      notify('success', 'Xác nhận thành công!');
      setLoadDataRequestKey?.(Date.now());
    } else {
      notify('error', 'Error!');
    }
    setIsLoading(false);
  };

  const listRequestColumns: TableProps<ListRequest>['columns'] = [
    {
      title: 'Mã đơn hàng',
      dataIndex: 'requestId',
      key: 'requestId',
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
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Gói',
      dataIndex: 'serviceId',
      key: 'serviceId',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Action',
      render: (_, rowData) => (
        <Space size='middle'>
          {isRequestAccepted ? (
            <DiamondButton
              content='Nhập kết quả'
              onClick={() => {
                setRequestId(rowData.requestId);
                setIsOpenCreateResultModal(true);
              }}
            />
          ) : (
            <Popconfirm
              title='Xác nhận đơn'
              description='Bạn có muốn nhận đơn này?'
              onConfirm={() => handleAcceptRequest(rowData.requestId)}
              okText='Xác nhận'
              cancelText='Hủy'
            >
              <DiamondButton content='Xác nhận' />
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];

  return (
    <>
      <Loading loading={isLoading} />
      <div className='d-flex flex-column'>
        <CustomTable columns={listRequestColumns} dataSource={dataSource} />
      </div>
      <CreateResultModal
        requestId={requestId}
        isOpenCreateResultModal={isOpenCreateResultModal}
        setIsOpenCreateResultModal={setIsOpenCreateResultModal}
        setLoadDataRequestAcceptedKey={setLoadDataRequestAcceptedKey}
      />
    </>
  );
};

export default ListRequestTable;
