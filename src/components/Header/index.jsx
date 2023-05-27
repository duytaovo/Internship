import React from "react";
import { Link } from "react-router-dom";
// import PropTypes from 'prop-types'
import Button from "../Button";
import Logo from "../Logo";
import "./styles.scss";

function Header(props) {
  return (
    <div className="container onMobile config">
      <Logo />
      <div className="login__home">
        <Link to="/login" className="login">
          <h5>Đăng nhập</h5>
        </Link>
        <Link to="/register" className="register">
          <Button bwidth="117px" bheight="45px" name="Đăng ký" />
        </Link>
      </div>
    </div>
  );
}

Header.propTypes = {};

export default Header;
