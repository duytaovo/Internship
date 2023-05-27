import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles.scss";
import logo from "./logo.png";
import { useDispatch, useSelector } from "react-redux";
import { getMarkByUser } from "src/store/slices/main/mark/markSlice";

const limit = process.env.LIMIT_OF_PAGE || 5;

const Logo = ({ id }) => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.authentication);
  const navigate = useNavigate();
  const roleList = {
    3: "Ứng viên",
    1: "Nhà tuyển dụng",
    4: "Cộng tác viên",
  };
  const handleClickGoHome = async () => {
    if (profile.token !== undefined) {
      const dataGetMarkByUser = {
        userName: profile.username,
        page: {
          no: 0,
          limit: limit,
        },
      };
      dispatch(getMarkByUser(dataGetMarkByUser));
      const role = profile.role;
      switch (role) {
        case "Role_HR":
          navigate(`/hr`, { replace: true });
          // getMarkByUser();
          break;
        case "Role_Partner":
          navigate(`/partner`, { replace: true });
          // getMarkByUser();
          break;
        default:
          navigate(`/candidate`, { replace: true });
          break;
      }
    } else {
      navigate(`/`);
    }
  };
  useEffect(() => {
    // const dataGetMarkByUser = {
    //   userName: profile.username,
    //   page: {
    //     no: 0,
    //     limit: 10,
    //   },
    // };
    // if (profile.role === "Role_Candidate") {
    //   dispatch(getMarkByUser(dataGetMarkByUser));
    // }
    // handleClickGoHome();
  }, []);

  return (
    <div onClick={handleClickGoHome}>
      <Link to="" className="logo">
        <div className="roleName__header">
          <img src={logo} alt="" />
          <span>{id ? roleList[id] : ""}</span>
        </div>
      </Link>
    </div>
  );
};

export default Logo;
