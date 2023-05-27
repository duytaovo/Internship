import React from 'react'
import './styles.scss'
import { useSelector } from 'react-redux'

import Logo from '../../components/Logo/index'
import Notification from '../../components/Notification'
import {
  userSelector,
  statusSelector
} from '../../store/selectors/main/registerSelectors'

import { notificationSelector } from '../../store/selectors/notificationSelectors'

import { Link, useNavigate } from 'react-router-dom'
import { Typography } from '@mui/material'

export default function RegisterContainer({ Outlet }) {
  const notification = useSelector(notificationSelector)
  const navigate = useNavigate()

  const status = useSelector(statusSelector)

  if (status === 'success') {
    setTimeout(() => {
      navigate('/login')
    }, 1000)
  }

  const roleID = useSelector(userSelector)?.role?.id
  return (
    <div className="register-container">
      <div className="logo-register-page">
        <Logo id={roleID ? roleID : false} />
      </div>
      <h1 className="register-container__title">Đăng ký</h1>
      <Outlet />
      <div className="register-container__footer">
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontSize: 17,
            fontWeight: '400',
            transform: 'translate(5px,5px)'
          }}
        >
          Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link>
        </Typography>
      </div>
      <Notification notifyAlert={notification} />
    </div>
  )
}
