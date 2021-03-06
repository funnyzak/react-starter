import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { FaBeer } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Hello, Image } from '@/components';
import avatarImg from '@/assets/img/avatar.png';
import txtExample from '@/assets/source/example.txt';
import hbsExample from '@/assets/source/example.hbs';

export default () => (
  <div>
    <Image src={avatarImg} />
    <Avatar size={64} icon={<UserOutlined />} />
    <br />
    <dl>
      <dt>Routes</dt>
      <dd>
        <Link to="/user">User</Link>
      </dd>
      <dd>
        <Link to="/about">About</Link>
      </dd>
      <dd>
        <Link to="/article/1">Article</Link>
      </dd>
      <dd>
        <Link to="/error?title=您的访问无法完成&statusCode=403">
          Error Page
        </Link>
      </dd>
    </dl>
    <h3>
      {' '}
      Lets go for a
      {' '}
      <FaBeer />
      ?
      {' '}
    </h3>
    <Hello name="TypeScript" enthusiasmLevel={3} />
    <div>{txtExample}</div>
    <div dangerouslySetInnerHTML={{ __html: hbsExample }} />
  </div>
);
