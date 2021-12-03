import React, { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import classes from './Navigation.module.css';

const Navigation = (props) => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <nav className={classes.nav}>
      <ul>
        {isLoggedIn && (
          <li>
            <a href='/'>Users</a>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <a href='/'>Admin</a>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <button onClick={props.onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
