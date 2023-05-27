import "./styles.scss";
import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer";
import { useLocation } from "react-router-dom";
import HeaderWithHR from "src/components/HeaderWithHR";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getMarkByUser } from "src/store/slices/main/mark/markSlice";

const no = process.env.NO_OF_PAGE;
const limit = process.env.LIMIT_OF_PAGE || 5;

console.log(limit);
const CandidateLayOut = () => {
  let location = useLocation();
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.authentication);

  useEffect(() => {
    const dataGetMarkByUser = {
      userName: profile.username,
      page: {
        no: 0,
        limit: limit,
      },
    };
    dispatch(getMarkByUser(dataGetMarkByUser));
  }, []);

  return (
    <div className="main__layout">
      {location.pathname === "/candidate/information_company" ? (
        <HeaderWithHR id={3} search />
      ) : (
        <HeaderWithHR id={3} candidate_res />
      )}
      <div className="candidate__layout-body-outlet">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default CandidateLayOut;
