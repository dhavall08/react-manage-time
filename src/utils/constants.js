export const timeColumns = [
  {
    title: '#',
    dataIndex: 'index',
    width: '15%',
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
    render: (text, record, index) => `${record.hours}:${record.minutes}`,
  },
];
