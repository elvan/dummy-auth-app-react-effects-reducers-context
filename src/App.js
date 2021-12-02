import React, { useEffect, useState } from 'react';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import MainHeader from './components/MainHeader/MainHeader';

const LOCAL_STORAGE_KEY = 'dummy-auth-app-react-is-logged-in';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserLoggedIn = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (storedUserLoggedIn === '1') {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (_email, _password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem(LOCAL_STORAGE_KEY, '1');
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setIsLoggedIn(false);
  };

  return (
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </React.Fragment>
  );
}

export default App;
