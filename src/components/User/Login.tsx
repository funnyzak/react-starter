import React from 'react';
import { login, logout, loginAsync } from '@/store/features/User';

import styles from './Login.module.css';
import { useAppDispatch } from '@/store';

interface Props {}

const Login: React.FC<Props> = () => {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.login}>
      <button
        type="button"
        onClick={() => dispatch(
          loginAsync({ name: 'leon', age: 26, email: 'email@gmail.com' })
        )}
      >
        Log In
      </button>
      <button type="button" onClick={() => dispatch(logout())}>
        Log Out
      </button>
    </div>
  );
};

export default Login;
