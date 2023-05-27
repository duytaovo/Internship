import "./styles.scss";
import "./reponsive.scss";
import { useState } from "react";
import Modal from "../Modal";
import ProfileForm from "src/containers/Home/ProfileForm";
import { CompanyInfo, UniversityInfo, UserInfor } from "./components";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const roleUser = JSON.parse(sessionStorage.getItem("userPresent"))?.role;
  let RelatedInfor = "";
  switch (roleUser) {
    case "Role_HR":
      RelatedInfor = <CompanyInfo />;
      break;
    case "Role_Partner":
      RelatedInfor = <UniversityInfo />;
      break;
    case "Role_Candidate":
      RelatedInfor = null;
      break;
    default:
      RelatedInfor = null;
  }
  return (
    <>
      <div className="profile__wrapper">
       <UserInfor open={open} setOpen={setOpen} /> 
          {RelatedInfor}
      </div>
      <Modal
        modalTitle="Chỉnh sửa thông tin cá nhân"
        children={<ProfileForm handleClose={handleClose} />}
        open={open}
        setOpen={setOpen}
        name="profile"
      />
    </>
  );
};

export default Profile;
