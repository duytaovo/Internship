import React, { useState } from 'react'

import AddOutlinedIcon from '@mui/icons-material/AddOutlined'

import HeaderContainer from '../../../containers/Admin/HeaderContainer/HeaderContainer'
import Modal from '../../../components/Modal'
import DemandTable from './DemandTable'
import DemandForm from '../../../containers/Admin/DemandForm'

export default function Demand() {
  const [open, setOpen] = useState(false)

  const handleSearch = e => {}

  const handleOpenModal = () => {
    setOpen(true)
  }

  return (
    <>
      <HeaderContainer
        headerName="Quản lý nhu cầu tìm việc"
        placeholder="Tìm kiếm nhu cầu"
        onchange={handleSearch}
        // selectName="position"
        btnName="Thêm bài đăng"
        BtnIcon={AddOutlinedIcon}
        onClick={handleOpenModal}
      />
      <DemandTable />
      <Modal modalTitle="Thêm bài đăng" open={open} setOpen={setOpen}>
        <DemandForm isAdd={true} />
      </Modal>
    </>
  )
}
