import { LoginOutlined, LogoutOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { sessionActions, sessionSelector } from '../../redux/reducer/sessionSlice'

export const LoginButton = (props: any) => {
  const { username } = useSelector(sessionSelector)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onLogout = () => {
    localStorage.removeItem('Name');
    localStorage.removeItem('Password');
    dispatch(sessionActions.logout())
  }
  const onLogin = () => {
    navigate('/login')
  }
  if (!username) {
    return (
      <Button onClick={onLogin} {...props}>
        Login
      </Button>
    )
  } else {
    return (
      <Button onClick={onLogout} {...props}>
        {`Logout [${username}]`}
      </Button>
    )
  }
}
