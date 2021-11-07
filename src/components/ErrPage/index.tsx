import React from 'react';

import './index.scss';

export interface IErrorPageProp {
  title?: string;
  description?: string;
  url?: string;
  statusCode?: number;
  message?: string;
}

const Index: React.FC<IErrorPageProp> = ({
  title,
  description,
  url,
  statusCode,
  message
}) => (
  <div className="wrapper">
    <div className="header">
      <div className="logo sanbox" />
      <h2>Error</h2>
    </div>
    <div className="header-bottom" />
    <div className="wrapper2">
      <h1>{title}</h1>
      <div className="error-detail">
        <p>{description}</p>
        <b>{url ? new URL(url).pathname : ''}</b>
        <p>
          <br />
        </p>
        <p>错误描述：</p>
        <li>
          状态码：
          {statusCode}
        </li>
        <li>
          消息：
          {message}
        </li>
      </div>
    </div>
    <div className="footer">
      <div className="logo sanbox" />
      <br />
      Generated
      {new Date().toString()}
      {' '}
      {url && url.length > 0 ? <a href={url}>重试</a> : null}
    </div>
  </div>
);

Index.defaultProps = {
  title: '访问遇到问题',
  description: '您当前的请求暂无法完成',
  statusCode: 404,
  message: 'Not Found'
};

export default Index;
