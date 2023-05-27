import React from 'react'
import { TabTitle } from 'src/utils/GeneralFunctions'
import PartnerHomePage from './PartnerHomePage'
import './styles.scss'

const PartnerHome = () => {
  TabTitle('IT Internship JOBS | Trang chủ Cộng tác viên')
  return (
    <div>
      <PartnerHomePage></PartnerHomePage>
    </div>
  )
}

export default PartnerHome
