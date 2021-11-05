import React from 'react';

import './index.scss';

interface IErrorPageProp {
  title?: string;
  description?: string;
  urlPath?: string;
  statusCode?: number;
  message?: string;
}

const Index: React.FC<IErrorPageProp> = ({
  title,
  description,
  urlPath,
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
        <p>
          <br />
        </p>
        <p>描述：</p>
        <li>
          路径：
          {urlPath}
        </li>
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
    </div>
  </div>
);

Index.defaultProps = {
  title: '访问出错',
  description: '您的请求目前无法完成',
  urlPath: '',
  statusCode: 404,
  message: 'Not Found'
};

export default Index;
