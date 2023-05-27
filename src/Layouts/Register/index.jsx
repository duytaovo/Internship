import React from "react";
import RegisterContainer from "../../containers/RegisterContainer/index";
import "./styles.scss";
import "./responsive.scss";
import { Outlet } from "react-router-dom";
import Header from "src/components/Header";
import Footer from "src/components/Footer";

export default function RegisterLayout() {
  return (
    <div className="register-layout">
      <Header />
      <div className="register-container-wrapper">
        <RegisterContainer Outlet={Outlet} />
      </div>
      <Footer />
    </div>
  );
}
