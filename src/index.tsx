import * as ReactDOM from 'react-dom';
import React from 'react';
import { HashRouter } from 'react-router-dom';
import App from './App';

// 引入normalize.css
import 'normalize.css';

ReactDOM.render(
  <React.StrictMode>
    {/* 使用BrowerRouter 需要配合服务器调整。具体看这里：https://react-guide.github.io/react-router-cn/docs/guides/basics/Histories.html#browserHistory */}
    {/* <BrowserRouter></BrowserRouter> */}
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
