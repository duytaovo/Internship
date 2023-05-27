import React, { useEffect, useState } from "react";
import Footer from "src/components/Footer";
import Header from "src/components/Header";
import LoginContainer from "../../containers/LoginContainer";
import "./styles.scss";
// import { Backdrop, Box, Button, Fade, Modal, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { updateStatusRegister } from "src/store/slices/main/register/registerSlice";
import Modal from "./../../components/Modal/index";
import { ModalContent } from "./components";

const LoginLayout = () => {
  const { status } = useSelector((state) => state.register);

  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "success") {
      setOpen(true);
    }
  }, [status]);

  const handleClose = () => {
    setOpen(false);
    dispatch(updateStatusRegister("idle"));
  };

  return (
    <div className="login-layout">
      <Header />

      <div className="login-container-wrapper">
        <LoginContainer />
        <div className="login-container__modal">
          <Modal
            modalTitle="Thông báo"
            open={open}
            setOpen={setOpen}
            children={
              <ModalContent
                onClick={handleClose}
                nameButton="Đồng ý"
                className="login-container__modal--content"
              />
            }
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LoginLayout;
