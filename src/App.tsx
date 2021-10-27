import { Hello, Image } from './components';
import avatarImg from './assets/img/avatar.png';
import txtExample from './assets/source/example.txt';
import hbsExample from './assets/source/example.hbs';

export default () => (
  <div>
    <Image src={avatarImg} />
    <Hello name="TypeScript" enthusiasmLevel={3} />
    <div>{txtExample}</div>
    <div dangerouslySetInnerHTML={{ __html: hbsExample }} />
  </div>
);
