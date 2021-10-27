import { Hello, Image } from './components';
import avatarImg from './assets/img/avatar.png';
import txtExample from './assets/source/example.txt';
import hbsExample from './assets/source/example.hbs';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { FaBeer } from 'react-icons/fa';

export default () => (
  <div>
    <Image src={avatarImg} />
    <Avatar size={64} icon={<UserOutlined />} />
    <h3> Lets go for a <FaBeer />? </h3>
    <Hello name="TypeScript" enthusiasmLevel={3} />
    <div>{txtExample}</div>
    <div dangerouslySetInnerHTML={{ __html: hbsExample }} />
  </div>
);
