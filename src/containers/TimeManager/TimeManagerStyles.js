import styled from 'styled-components';
import { InputNumber, Table } from 'antd';

export const Wrapper = styled.div`
  max-width: 600px;
  margin: 20px auto;
  padding: 0px 20px;
  .head-diff {
    text-align: center;
    padding: 8px;
  }
  .settings {
    padding: 20px;
    background: linear-gradient(135deg, #f6d36559 0%, #fda08530 100%);
    & > div {
      display: flex;
      align-items: baseline;
      flex-wrap: wrap;
      & > span {
        flex-grow: 1;
      }
    }
    @keyframes fadeInUp {
      0% {
        opacity: 0;
        transform: translateY(20px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }
    &.fadeInUp {
      animation-name: fadeInUp;
      animation-duration: 0.45s;
      animation-fill-mode: both;
    }
  }
  .head-title {
    color: #4a4a4a;
    background: linear-gradient(0deg, #cce6ff, #d7faff);
    text-align: center;
    padding: 8px;
    margin-bottom: 8px;
    position: relative;
    h2 {
      margin-bottom: 0px;
    }
    .anticon-setting {
      position: absolute;
      top: 24px;
      right: 0;
      margin-right: 26px;
      font-size: 30px;
      transform-origin: center;
      transition: transform 1s ease-in-out;
      &:hover {
        transform: rotate(360deg);
      }
    }
  }
`;

export const Adder = styled.div`
  display: flex;
  flex-wrap: wrap;
  .ant-picker {
    flex-grow: 1;
    margin-right: 8px;
    margin-bottom: 8px;
  }
  > button {
    margin-bottom: 8px;
    flex-grow: 1;
  }
  > button + button {
    margin-left: 8px;
  }
`;

export const HourInput = styled(InputNumber)`
  &.ant-input-number {
    width: 70px;
    margin-right: 8px;
    margin-bottom: 8px;
  }
`;

export const TimeTable = styled(Table)`
  &.ant-table-wrapper {
    max-width: 600px;
  }
`;
