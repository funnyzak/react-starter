import { useRoutes } from 'react-router-dom';
import routers from './routers';

export default () => {
  const elements = useRoutes(routers);
  return <>{elements}</>;
};
