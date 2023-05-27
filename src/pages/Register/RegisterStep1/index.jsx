import React from 'react'
import Button from '../../../components/Button'
import { useNavigate } from 'react-router-dom'
import './styles.scss'
import { TabTitle } from 'src/utils/GeneralFunctions'

export default function RegisterStep1() {
  TabTitle('Đăng ký')

  const roleList = [
    {
      id: 3,
      name: 'ỨNG VIÊN',
      path: '/register/candidate'
    },
    {
      id: 1,
      name: 'NHÀ TUYỂN DỤNG',
      path: '/register/hr'
    },
    {
      id: 4,
      name: 'CỘNG TÁC VIÊN TRƯỜNG',
      path: '/register/partner'
    }
  ]

  const navigate = useNavigate()

  const handleClick = path => {
    navigate(path)
  }

  return (
    <div className="register-step1">
      <div className="register-step1__choices">
        {roleList.map((role, i) => (
          <div
            className="register-step1__choices--btn"
            key={i}
            onClick={() => handleClick(role.path)}
          >
            {<Button name={role.name} bwidth="285px" />}
          </div>
        ))}
      </div>
    </div>
  )
}
