import React, { useState, useEffect } from 'react';
import { InputNumber, Table, Button, Spin, notification } from 'antd';
import 'antd/dist/antd.css';
import styled from 'styled-components';

import { AppstoreAddOutlined, LoadingOutlined } from '@ant-design/icons';
import { format } from 'date-fns';
import { getKey } from '../../utils/helper';

const columns = [
  {
    title: '#',
    dataIndex: 'index',
    width: '100px',
    key: 'index',
    render: (text, record, index) => index + 1,
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Time (h:m)',
    dataIndex: 'time',
    key: 'time',
  },
];

const notifyUser = (type, obj = { message: 'Success!' }) => {
  notification[type]({
    ...obj,
    style: {
      width: 250,
      marginLeft: 335 - 250,
    },
    placement: 'bottomRight',
  });
};

function HourManage() {
  const [time, changeTime] = useState({
    hours: 8,
    minutes: 30,
  });
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setLoading(true);
    const data = localStorage.getItem('data');
    const parsedData = JSON.parse(data);
    setData(parsedData || []);
    setLoading(false);
    return parsedData;
  };

  const changeInput = (name, value) => {
    changeTime((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addData = () => {
    const today = format(new Date(), 'dd/MM/yyyy');
    // const newData = { ...data };
    // newData.push({
    //   key: newData.length,
    //   date: today,
    //   time: `${time.hours}:${time.minutes}`
    // })
    const currentData = getData();
    const newKey = getKey();
    const newObj = {
      key: newKey,
      date: today,
      time: `${time.hours}:${time.minutes}`,
    };
    const newData = currentData ? [...currentData, newObj] : [newObj];
    storeData(newData);
  };

  const storeData = (newData) => {
    localStorage.setItem('data', JSON.stringify(newData));
    getData();
    notifyUser('success', { message: 'Data Updated!' });
  };

  const onSelectRow = (selectedRowKeys, selectedRows) => {
    setSelectedRow(selectedRowKeys);
  };

  const deleteData = () => {
    storeData(data.filter((v) => !selectedRow.includes(v.key)));
    setSelectedRow([]);
    getData();
  };

  return (
    <Wrapper>
      <Spin
        spinning={loading}
        indicator={<LoadingOutlined style={{ fontSize: 32 }} spin />}
      >
        <Adder>
          <HourInput
            name="hours"
            size="large"
            placeholder="H"
            min={0}
            max={24}
            defaultValue={8}
            value={time.hours}
            onChange={(v) => changeInput('hours', v)}
          />
          <HourInput
            name="minutes"
            size="large"
            placeholder="M"
            prefix="M"
            min={0}
            max={59}
            defaultValue={8}
            value={time.minutes}
            onChange={(v) => changeInput('minutes', v)}
          />
          <Button
            type="primary"
            size="large"
            icon={<AppstoreAddOutlined />}
            onClick={addData}
          >
            Add
          </Button>
          <Button
            type="primary"
            size="large"
            onClick={deleteData}
            disabled={!selectedRow || selectedRow.length === 0}
            danger
          >
            Delete Selected
          </Button>
        </Adder>
        <TimeTable
          dataSource={data && Array.isArray(data) ? data : []}
          columns={columns}
          pagination={false}
          rowSelection={{
            type: 'checkbox',
            onChange: onSelectRow,
          }}
        />
      </Spin>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  max-width: 600px;
  margin: 40px auto;
  padding: 0px 20px;
`;
const Adder = styled.div`
  text-align: end;
  > button + button {
    margin-left: 8px;
  }
`;

const HourInput = styled(InputNumber)`
  &.ant-input-number {
    width: 70px;
    margin: 0 8px 8px 0;
  }
`;

const TimeTable = styled(Table)`
  &.ant-table-wrapper {
    max-width: 600px;
  }
`;

export default HourManage;
