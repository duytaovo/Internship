import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import AddCardIcon from "@mui/icons-material/AddCard";
import PropTypes from "prop-types";
import Logo from "../Logo";
import "./styles.scss";
import SearchResultHome from "../SearchResultHome";
import AccountMenu from "../AccountMenu";
import { getUserById } from "src/store/slices/Admin/user/userSlice";

function HeaderWithPartner(props) {
  const location = useLocation();
  const pathUrl = location.pathname;
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const idUser = JSON.parse(sessionStorage.getItem("userPresent"))?.idUser;
    dispatch(getUserById(idUser));
  }, []);

  return (
    <div className="container-header__partner header__partner config">
      <Logo />
      <div className="header__partner">
        <Link to="/partner/post" className="header__partner-post">
          <AddCardIcon sx={{color: "#04bf8a"}}></AddCardIcon>
          <span className="header__partner-post-post">Đăng tuyển</span>
        </Link>
        <Link to="/partner/post-list" className="header__partner-post">
          <FormatAlignJustifyIcon sx={{color: "#04bf8a"}}></FormatAlignJustifyIcon>
          <span className="header__partner-post-post">
            Danh sách các đợt thực tập
          </span>
        </Link>
      </div>
      {props.search ? (
        <SearchResultHome
          bwidth="681px"
          bheight="33px"
          bwidthInput="fit-content"
          bheightInput="fit-content"
          mb="0"
          candidate_infomation={true}
        />
      ) : null}
      <div className="header__partner-icon">
        <div className="header__partner-icon-config">
        </div>
        <div
          style={{
            borderRadius: "14px",
            backgroundColor: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            paddingLeft: "6px",
          }}
        >
          <h4 className="name">Chào {user?.lastName || "User"}</h4>
          <AccountMenu linkImg="https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg" />
        </div>
      </div>
    </div>
  );
}

HeaderWithPartner.propTypes = {
  idMark: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  idNoti: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default HeaderWithPartner;
