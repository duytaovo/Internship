import React from 'react'
import CandidateInfo from './CandidateInfo/index'
import HRInfo from './HRInfo/index'
import PartnerInfo from './PartnerInfo/index'

export default function RegisterStep3() {
  const roleID = JSON.parse(sessionStorage.getItem('account'))?.role.id

  const roleInfo = [
    {
      id: 3,
      compo: <CandidateInfo key={3} />
    },
    {
      id: 1,
      compo: <HRInfo key={1} />
    },
    {
      id: 4,
      compo: <PartnerInfo key={4} />
    }
  ]

  const renderInfo = id => {
    return roleInfo.map(info => {
      if (info.id === id) {
        return info.compo
      }
    })
  }

  return <>{renderInfo(roleID)}</>
}
