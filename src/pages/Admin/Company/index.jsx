import React, { useState } from 'react'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'

import HeaderContainer from '../../../containers/Admin/HeaderContainer/HeaderContainer'
import Modal from '../../../components/Modal'
import CompanyForm from '../../../containers/Admin/CompanyForm'
import CompanyTable from './CompanyTable'

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

export default function Company() {
  const [open, setOpen] = useState(false)

  const handleSearch = e => {
    // console.log(e.target.value);
  }

  const handleOpenModal = () => {
    setOpen(true)
  }

  return (
    <>
      <HeaderContainer
        headerName="Quản lý công ty"
        placeholder="Tìm kiếm công ty"
        onchange={handleSearch}
        selectName="role"
        selectOptions={selectOptions}
        btnName=""
        BtnIcon={AddOutlinedIcon}
        onClick={handleOpenModal}
      />
      <CompanyTable />
      <Modal modalTitle="Thêm Công Ty" open={open} setOpen={setOpen}>
        <CompanyForm isAdd={true} />
      </Modal>
    </>
  )
}
