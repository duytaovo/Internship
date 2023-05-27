import React, { useState } from 'react'

import AddOutlinedIcon from '@mui/icons-material/AddOutlined'

import HeaderContainer from '../../../containers/Admin/HeaderContainer/HeaderContainer'
import Modal from '../../../components/Modal'
import UniversityTable from './UniversityTable'
import UniversityForm from '../../../containers/Admin/UniversityForm'

const selectOptions = [
  {
    value: 'All',
    name: 'All'
  },
  {
    value: 'HR',
    name: 'HR'
  },
  {
    value: 'Candidate',
    name: 'Candidate'
  },
  {
    value: 'Partner',
    name: 'Partner'
  }
]

export default function University() {
  const [open, setOpen] = useState(false)

  const handleSearch = e => {}

  const handleOpenModal = () => {
    setOpen(true)
  }

  return (
    <>
      <HeaderContainer
        headerName="Quản lý trường học"
        placeholder="Tìm kiếm trường"
        onchange={handleSearch}
        selectName="position"
        selectOptions={selectOptions}
        btnName="Thêm Uni"
        BtnIcon={AddOutlinedIcon}
        onClick={handleOpenModal}
      />
      <UniversityTable />
      <Modal modalTitle="Thêm trường" open={open} setOpen={setOpen}>
        <UniversityForm isAdd={true} />
      </Modal>
    </>
  )
}
