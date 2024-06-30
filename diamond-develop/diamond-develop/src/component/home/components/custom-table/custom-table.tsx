import { useMemo, useRef } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import type { InputRef, TableColumnType, TableProps } from 'antd';
import { Button, Input, Space, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { SETTING_SCROLL_TABLE } from '../../home.constant';

type Props = {
  dataSource: any[];
  columns: ColumnsType<any>;
} & TableProps;

const CustomTable = ({ dataSource, columns }: Props) => {
  const searchInput = useRef<InputRef>(null);

  const getColumnSearchProps = (dataIndex: string, title: string): TableColumnType<any> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Tìm kiếm ${title}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => confirm()}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type='primary'
            onClick={() => confirm()}
            icon={<SearchOutlined />}
            size='small'
            style={{ width: 110 }}
          >
            Tìm kiếm
          </Button>
          <Button
            type='link'
            size='small'
            onClick={() => {
              close();
            }}
          >
            Đóng
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) => text,
  });

  const columnsConvert = useMemo(() => {
    return columns.map((item) => {
      if (item.key) {
        return {
          ...item,
          ...getColumnSearchProps(item.key as string, item.title as string),
        };
      } else {
        return { ...item };
      }
    });
  }, [columns]);

  return <Table columns={columnsConvert} dataSource={dataSource} scroll={SETTING_SCROLL_TABLE} />;
};

export default CustomTable;
