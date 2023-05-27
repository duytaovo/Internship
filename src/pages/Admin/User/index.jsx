import React, { useState } from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

import "./styles.scss";
import HeaderContainer from "../../../containers/Admin/HeaderContainer/HeaderContainer";
import Modal from "../../../components/Modal";
import UserTable from "./UserTable";
import UserForm from "../../../containers/Admin/UserForm";

const selectOptions = [
  {
    value: "All",
    name: "All",
  },
  {
    value: "HR",
    name: "HR",
  },
  {
    value: "Candidate",
    name: "Candidate",
  },
  {
    value: "Partner",
    name: "Partner",
  },
];

const User = () => {
  const [open, setOpen] = useState(false);

  const handleSearch = (e) => {};

  const handleOpenModal = () => {
    setOpen(true);
  };

  return (
    <>
      <HeaderContainer
        headerName="Quản lý tài khoản"
        placeholder="Tìm kiếm người dùng"
        onchange={handleSearch}
        selectName="role"
        selectOptions={selectOptions}
        btnName="Thêm User"
        BtnIcon={AddOutlinedIcon}
        onClick={handleOpenModal}
        iconAdd={false}
      />
      <UserTable openModal={handleOpenModal} />
      <Modal
        modalTitle="Thêm người dùng"
        open={open}
        setOpen={setOpen}
        iconClose={true}
      >
        <UserForm />
      </Modal>
    </>
  );
};
export default User;
