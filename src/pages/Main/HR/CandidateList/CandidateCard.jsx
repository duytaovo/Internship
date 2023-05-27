import React, { useState } from "react";
import "./styles.scss";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ButtonMark from "src/components/ButtonMark";
import { Modal } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { toast } from "react-toastify";
export const CandidateCard = ({
  avatar = "https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg",
  candidate,
}) => {
  const [click, setClick] = useState(true)
  const [open, setOpen] = useState(false)
  const [numberCV, setNumberCV] = useState([])
  const viewProfileCV = (info) => {
    setOpen(!open)
    setNumberCV(info)
  }
  const renderCV = () => {
    return (
      <Modal
        iconClose={true}
        modalTitle="Xem CV Ứng Viên"
        open={open}
        setOpen={setOpen}

        children={
          <div style={{ width: "100%", height: "100%", padding: "2rem 4rem" }}><div onClick={() => setOpen(!open)} style={{ cursor: "pointer", float: "right", border: "1px solid #ccc", padding: "4px 8px", backgroundColor: "#fff", outline: "none", borderRadius: "5px" }}><CloseIcon /></div><img style={{ width: "100%", height: "100%", padding: "2rem 4rem" }} src={`http://103.48.192.239:8085/${numberCV.cv}`}></img></div>
        }
      />
    )
  }
  const addFavorite = (e) => {
    setClick(!click)
    {click ? toast.success("Đã thêm ứng viên vào yêu thích")
           : toast.warning("Xóa ứng viên khỏi yêu thích")}
  }
  return (
    <>
      <div className="candidate-card__wrapper">
        <img
          src={avatar}
          alt="ảnh đại diện"
          className="candidate-card__avatar"
        />
        <div className="candidate-card__infor">
          <div className="row">
            <h2 className="candidate-card__infor-name">{`${candidate?.userDTO?.lastName} ${candidate?.userDTO?.firstName}`}</h2>
          </div>
          <p className="candidate-card__infor-item">
            <span>Chuyên ngành:</span>
            {`${candidate?.major?.name}`}
          </p>
          <p className="candidate-card__infor-item">
            <span>Số điện thoại:</span>
            {`${candidate?.userDTO?.phone}`}
          </p>
          <p className="candidate-card__infor-item">
            <span>Email:</span>
            {`${candidate?.userDTO?.email}`}
          </p>
        </div>
        <div className="candidate-card__actions"  >
          <div className="view-button__wrapper" onClick={() => viewProfileCV(candidate)} >
            <RemoveRedEyeIcon />
            <p>Xem CV</p>
          </div>
          <div style={{ display: "none" }}><ButtonMark border="1px solid #DEDEDE" /></div>
          <div onClick={() => addFavorite()} style={{ border: "1px solid #DEDEDE", padding: "8px", borderRadius: "4px", cursor: "pointer", color: "#000" }}>{click ? <BookmarkBorderIcon /> : <BookmarkIcon />}</div>
        </div>
        <p className="candidate-card__infor-time">
          <AccessTimeIcon />
          09/06/2022
        </p>
        {renderCV()}
      </div>
    </>
  );
};

export default CandidateCard;
