import "./styles.scss";
import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer";
import { useLocation } from "react-router-dom";
import HeaderWithPartner from "src/components/HeaderWithPartner";

const PartnerLayout = () => {
  let location = useLocation();

  return (
    <div className="main__layout">
      {location.pathname === "/partner" ? (
        <HeaderWithPartner id={4} partner />
      ) : (
        <HeaderWithPartner id={4} partner />
      )}
      <div className="main__layout-body-outlet">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default PartnerLayout;
