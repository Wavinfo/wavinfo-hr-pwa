import React from 'react';
import { socketStatus } from './../utilities/helpers';

const getPunchButtonStyle = socketStatusCode => {
  switch (socketStatusCode) {
    case socketStatus.disconnected:
      return 'd-none';
    case socketStatus.connecting:
      return 'd-none';
    case socketStatus.punching:
      return 'disabled';
    default:
      return '';
  }
};

const Footer = ({ onEmitPunch, socketStatusCode, onOpenSocket }) => {
  return (
    <div className="block-footer">
      <div
        className={`w-100 position-relative ${
          socketStatusCode === socketStatus.connecting ? '' : 'd-none'
        }`}
      >
        <div className="progress">
          <div className="indeterminate" />
        </div>
        <button className="btn waves-effect waves-light w-100">
          連線中...
        </button>
      </div>

      <button
        className={`btn waves-effect waves-light ${
          socketStatusCode === socketStatus.disconnected ? '' : 'd-none'
        }`}
        onClick={onOpenSocket}
      >
        重新連線
      </button>
      <button
        className={`btn waves-effect waves-light ${getPunchButtonStyle(
          socketStatusCode
        )}`}
        onClick={() => {
          onEmitPunch('in');
        }}
      >
        上班打卡
        <i className="icon icon-briefcase" style={{ marginLeft: 10 }} />
      </button>
      <button
        className={`btn waves-effect waves-light ${getPunchButtonStyle(
          socketStatusCode
        )}`}
        onClick={() => {
          onEmitPunch('out');
        }}
      >
        下班打卡
        <i className="icon icon-exit" style={{ marginLeft: 10 }} />
      </button>
    </div>
  );
};

export default Footer;
