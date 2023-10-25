import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'

import router from './router'
import store from './redux/store'
import { SessionKeepAlive } from 'components/keep-alive'

import AntdLayout from 'components/antd/layout'
import { LoginBox } from 'components/antd/login-box'
import { Logout } from 'components/antd/logout-box'

import useToken from './useToken';

function App() {

  const { token, setToken } = useToken();
  const logoutTimerIdRef = React.useRef<number | null>(null)

  React.useEffect(() => {
    const autoLogout = () => {
        const timeOutId = window.setTimeout(Logout, 1000)
        logoutTimerIdRef.current = timeOutId
    };
  
    document.addEventListener('visibilitychange', autoLogout);
  
    return () => {
      document.removeEventListener('visibilitychange', autoLogout);
    };
  }, []);

  if (!token) {
    return (
        <LoginBox />
    );
  } 

  return (
      <>
      <SessionKeepAlive />
      <RouterProvider router={router} />
      </>
  );
}

export default App;
