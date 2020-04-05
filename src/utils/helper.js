import React from 'react';
import {notification, Modal} from 'antd';
import {ExclamationCircleOutlined} from '@ant-design/icons';

export const getKey = (currentData = []) => {
  const newKey = Date.now();
  return newKey;
};

export const prependZero = (value) => {
  return value > 9 ? value : '0' + value;
};

export const getDiffHours = (newData, idealTime) => {
  if (!newData || newData.length < 1) {
    return {
      hours: 0,
      minutes: 0,
      sign: '+',
    };
  }
  // total hours, minutes
  const total = newData.reduce((a, v) => ({
    hours: a.hours + v.hours,
    minutes: a.minutes + v.minutes,
  }));
  // total in minutes
  let minutes = total.minutes + total.hours * 60;
  // difference in minutes
  minutes -= idealTime.totalMins * newData.length;
  const sign = minutes < 0 ? '-' : '+';
  minutes = Math.abs(minutes);
  const hours = Math.floor(minutes / 60);
  minutes = minutes % 60;
  return {hours, minutes, sign};
};

export const notifyUser = (type, obj = {message: 'Success!'}) => {
  notification[type]({
    ...obj,
    style: {
      width: 400,
      marginLeft: 335 - 400,
    },
    placement: 'bottomRight',
  });
};

export const showOverwriteConfirm = (ok, cancel = () => {}) => {
  Modal.confirm({
    title: 'Are you sure you want to overwrite this date?',
    icon: <ExclamationCircleOutlined />,
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk() {
      ok();
    },
    onCancel() {
      cancel();
    },
  });
};
