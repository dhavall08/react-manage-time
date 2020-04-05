/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Button, Spin, DatePicker, Typography, Tooltip, Layout } from 'antd';
import {
  PlusSquareOutlined,
  LoadingOutlined,
  DeleteFilled,
  SettingFilled,
  SaveFilled,
} from '@ant-design/icons';
import 'antd/dist/antd.css';

import {
  getKey,
  prependZero,
  getDiffHours,
  notifyUser,
  showOverwriteConfirm,
} from '../../utils/helper';
import { HourInput, Adder, TimeTable, Wrapper } from './TimeManagerStyles';
import { timeColumns } from '../../utils/constants';

const { Title, Text } = Typography;
const { Content, Footer } = Layout;

const initIdealTime = {
  hours: 8,
  minutes: 30,
};

initIdealTime.totalMins = initIdealTime.minutes + initIdealTime.hours * 60;

// component
function TimeManager() {
  // table fields
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  // settings fields
  const [idealTime, changeIdealTime] = useState(initIdealTime);
  const [showSetting, setToggle] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [month, setMonth] = useState(moment().format('YYYY-MM'));
  // newly field
  const [time, changeTime] = useState({
    date: moment().format('DD/MM/YYYY'),
    hours: 8,
    minutes: 30,
  });
  // difference counter
  const [diffHours, setdiffHours] = useState({
    hours: 0,
    minutes: 0,
    sign: '+',
  });

  useEffect(() => {
    const parsedData = getData(month);
    const storedTime = localStorage.getItem('ideal');
    if (storedTime) {
      changeIdealTime(JSON.parse(storedTime));
    }
    reviseDiffHours(parsedData);
  }, []);

  useEffect(() => {
    changeIdealTime((prev) => ({
      ...prev,
      totalMins: prev.minutes + prev.hours * 60,
    }));
  }, [idealTime.hours, idealTime.minutes]);

  const getData = (currentMonth) => {
    setLoading(true);
    const data = localStorage.getItem(currentMonth || month);
    const parsedData = JSON.parse(data);
    setData(parsedData || []);
    setLoading(false);
    return parsedData;
  };

  const changeInput = (name, value, ideal = false) => {
    const func = ideal ? changeIdealTime : changeTime;
    func((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addData = () => {
    const currentData = getData();
    if (moment(time.date, 'DD-MM-YYYY').format('YYYY-MM') !== month) {
      notifyUser('error', { message: 'Please select same month!' });
      return;
    }
    const newKey = getKey();
    const newObj = {
      key: newKey,
      date: time.date,
      hours: time.hours,
      minutes: time.minutes,
    };
    if (
      currentData &&
      currentData.length > 0 &&
      currentData.find((v) => v.date === time.date)
    ) {
      showOverwriteConfirm(() => {
        const newData = currentData
          ? [...currentData.filter((v) => v.date !== time.date), newObj]
          : [newObj];
        storeData(newData);
      });
      return;
    }
    const newData = currentData ? [...currentData, newObj] : [newObj];
    storeData(newData);
  };

  const storeData = (newData) => {
    localStorage.setItem(month, JSON.stringify(newData));
    getData();
    notifyUser('success', { message: 'Data Updated!' });
    reviseDiffHours(newData);
  };

  const onSelectRow = (selectedRowKeys, selectedRows) => {
    setSelectedRow(selectedRowKeys);
  };

  const deleteData = () => {
    storeData(data.filter((v) => !selectedRow.includes(v.key)));
    setSelectedRow([]);
    reviseDiffHours();
  };

  const saveTime = () => {
    localStorage.setItem('ideal', JSON.stringify(idealTime));
    notifyUser('success', { message: 'Settings Updated!' });
    reviseDiffHours(data);
  };

  const changeMonth = (value) => {
    setMonth(value);
    notifyUser('success', { message: 'Month Changed!' });
    reviseDiffHours(getData(value));
  };

  const reviseDiffHours = (newData = getData()) => {
    setdiffHours(getDiffHours(newData, idealTime));
  };

  return (
    <Layout>
      <Content className="content">
        <Wrapper>
          <Spin
            spinning={loading}
            indicator={<LoadingOutlined style={{ fontSize: 32 }} spin />}
          >
            <div className="head-title">
              <Title level={2}>Timely</Title>
              <Text>Personal Time Manager</Text>
              <Tooltip title="Toggle Setting">
                <SettingFilled onClick={() => setToggle((prev) => !prev)} />
              </Tooltip>
            </div>
            {showSetting && (
              <div className="settings fadeInUp">
                <div>
                  <Text>Set Ideal Time (all months):</Text>
                  <HourInput
                    name="hours"
                    placeholder="H"
                    min={0}
                    max={24}
                    defaultValue={8}
                    value={idealTime.hours}
                    onChange={(v) => changeInput('hours', v, true)}
                  />
                  <HourInput
                    name="minutes"
                    placeholder="M"
                    prefix="M"
                    min={0}
                    max={59}
                    defaultValue={8}
                    value={idealTime.minutes}
                    onChange={(v) => changeInput('minutes', v, true)}
                  />
                  <Button type="primary" onClick={saveTime}>
                    <SaveFilled />
                  </Button>
                </div>
                <div>
                  <Text>Select Month: </Text>
                  <DatePicker
                    value={moment(month, 'YYYY-MM')}
                    allowClear={false}
                    picker="month"
                    onChange={(date, dateString) => changeMonth(dateString)}
                  />
                </div>
              </div>
            )}
            <div className="head-diff">
              <Title level={3} type={diffHours.sign === '-' ? 'danger' : ''}>
                {diffHours.sign}
                {prependZero(diffHours.hours)}:{prependZero(diffHours.minutes)}{' '}
                hrs
              </Title>
            </div>
            <Adder>
              <DatePicker
                size="large"
                allowClear={false}
                format="DD/MM/YYYY"
                value={moment(time.date, 'DD/MM/YYYY')}
                onChange={(date, dateString) => changeInput('date', dateString)}
              />
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
                icon={<PlusSquareOutlined />}
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
                <DeleteFilled />
              </Button>
            </Adder>
            <TimeTable
              dataSource={data && Array.isArray(data) ? data : []}
              columns={timeColumns}
              pagination={false}
              size="small"
              rowSelection={{
                type: 'checkbox',
                onChange: onSelectRow,
              }}
            />
          </Spin>
        </Wrapper>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Created by Dhaval L.</Footer>
    </Layout>
  );
}

export default TimeManager;
