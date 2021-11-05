import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import { Outlet } from 'react-router-dom';

// 通用样式
import '../styles/App.less';

export default () => (
  <ConfigProvider direction="ltr" locale={zhCN}>
    <>
      <Outlet />
    </>
  </ConfigProvider>
);
