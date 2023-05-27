import React, { useState } from "react";
import WorkIcon from "@mui/icons-material/Work";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import moment from "moment";

import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  deleteMark,
  getMarkByUser,
} from "src/store/slices/main/mark/markSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  addApply,
  deleteApply,
  getApplyListByIdCandidate,
} from "src/store/slices/main/candidate/apply/applySlice";
import { getCandidateByUserName } from "src/store/slices/main/candidate/info/infoCandidateSlice";
import { IconButton, Tooltip } from "@mui/material";
import Button from "../Button";

const no = process.env.NO_OF_PAGE;
const limit = process.env.LIMIT_OF_PAGE || 5;

const CardJob = ({ jobCare, jobApplied, eleDuplicate }) => {
  const { profile } = useSelector((state) => state.authentication);
  const { candidateInfoByUsername } = useSelector(
    (state) => state.infoCandidate
  );
  const [disabled, setDisabled] = useState(false);
  const [name, setName] = useState("Ứng tuyển");
  const dispatch = useDispatch();
  const handleDeleteJobCare = async (e) => {
    e.stopPropagation();
    await dispatch(deleteMark(jobCare.id)).then(
      toast.success("Đã hủy lưu việc làm")
    );
    const dataGetMarkByUser = {
      userName: profile.username,
      page: {
        no: 0,
        limit: limit,
      },
    };
    await dispatch(getMarkByUser(dataGetMarkByUser));
  };

  const handleDeleteJobApply = async (e) => {
    e.stopPropagation();
    await dispatch(deleteApply(jobApplied.id)).then(
      toast.success("Đã xóa công việc thành công")
    );
    await dispatch(getCandidateByUserName(profile.username));
    const dataGetAppliedByCandidate = {
      idCandidate: candidateInfoByUsername?.id,
      page: {
        no: 0,
        limit: limit,
      },
    };
    await dispatch(getApplyListByIdCandidate(dataGetAppliedByCandidate));
  };

  const handleAddJob = async (e) => {
    e.stopPropagation();
    const res = await dispatch(getCandidateByUserName(profile.username));
    if (!res.payload.cv) {
      toast.error("Bạn chưa có CV, vui lòng cập nhật");
    } else {
      const applyData = {
        apply: JSON.stringify({
          jobApp: {
            id: jobCare.jobCare.id,
          },
          candidate: {
            id: res.payload.id,
          },
          referenceLetter: `Đơn ứng tuyển ${profile.username}`,
        }),
        fileCV: res.cv,
      };

      const resApply = await dispatch(addApply(applyData));
      if (resApply.payload.status === 200) {
        toast.success("Đã nộp CV thành công");
        setDisabled(true);
        setName("Đã ứng tuyển");
      }
      const dataGetAppliedByCandidate = {
        idCandidate: candidateInfoByUsername?.id,
        page: {
          no: 0,
          limit: limit,
        },
      };
      await dispatch(getApplyListByIdCandidate(dataGetAppliedByCandidate));
    }
  };
  return (
    <div className="card-job__container">
      {jobCare && (
        <>
          <div className="card-job__info">
            <div className="card-job__title">
              <h3 className="card-job__name">{jobCare.jobCare?.name}</h3>
            </div>
            <div className="card-job__content">
              <img
                src="
              https://r2s.edu.vn/wp-content/uploads/2021/05/r2s.com_.vn_-316x190.png
            
            "
                alt="logo-company"
              />
              <div className="card-job__content-detail">
                <h5 className="card-job__company-name">
                  {jobCare.jobCare?.hr?.company?.name}
                </h5>
                <div className="card-job__company-work-time">
                  <WorkIcon />
                  <span className="card-job-text">
                    {jobCare.jobCare?.jobType.name}
                  </span>
                </div>
                <div className="card-job__company-location">
                  <LocationOnIcon />
                  <span className="card-job-text">
                    {jobCare.jobCare?.locationjob.address}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="card-job__detail">
            <div className="card-job__deadline">
              <AccessTimeIcon />
              <span>
                {moment(jobCare.jobCare?.timeStartStr).format("DD/MM/YYYY")} -{" "}
                {moment(jobCare.jobCare?.timeEndStr).format("DD/MM/YYYY")}
              </span>
              <Tooltip title="Xóa" onClick={handleDeleteJobCare}>
                <IconButton sx={{ fontSize: 12 }}>
                  <DeleteIcon color="" />
                </IconButton>
              </Tooltip>
            </div>

            <div className="card-job__send-cv">
              <Button name={name} onClick={handleAddJob} disabled={disabled} />
            </div>
          </div>
        </>
      )}
      {jobApplied && (
        <>
          <div className="card-job__info">
            <div className="card-job__title">
              <h3 className="card-job__name">{jobApplied?.jobApp?.name}</h3>
            </div>
            <div className="card-job__content">
              <img
                src="
              https://r2s.edu.vn/wp-content/uploads/2021/05/r2s.com_.vn_-316x190.png
            
            "
                alt="logo-company"
              />
              <div className="card-job__content-detail">
                <h5 className="card-job__company-name">
                  {jobApplied?.jobApp?.hr?.company?.name}
                </h5>
                <div className="card-job__company-work-time">
                  <WorkIcon />
                  <span className="card-job-text">
                    {jobApplied?.jobApp?.jobType.name}
                  </span>
                </div>
                <div className="card-job__company-location">
                  <LocationOnIcon />
                  <span className="card-job-text">
                    {jobApplied.jobApp?.locationjob?.address},
                    {jobApplied.jobApp?.locationjob?.district?.name}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="card-job__detail">
            <div className="card-job__deadline">
              <AccessTimeIcon />
              <span>
                {moment(jobApplied.jobApp?.timeStartStr).format("DD/MM/YYYY")} -{" "}
                {moment(jobApplied.jobApp?.timeEndStr).format("DD/MM/YYYY")}
              </span>
              <Tooltip title="Xóa" onClick={handleDeleteJobApply}>
                <IconButton sx={{ fontSize: 12 }}>
                  <DeleteIcon color="" />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CardJob;
