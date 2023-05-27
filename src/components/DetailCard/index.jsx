import { useEffect } from "react";
import PropTypes from "prop-types";
import // useSelector,
"react-redux";
// import { getJobList } from "../../store/slices/main/home/job/jobSlice";
// import moment from "moment";
import "./styles.scss";
import Detail from "./component";
import { useDispatch, useSelector } from "react-redux";
import { getAppreciateByCompany } from "src/store/slices/main/candidate/appreciate/appreciateSlice";
import { getJobByCompany } from "src/store/slices/main/home/job/jobSlice";

const DetailCard = ({
  jobDetail,
  jobList,
  candidate,
  jobPostHR,
  jobDetailById,
  demandPartner = false,
  jobListCompany,
}) => {
  const { appreciateList } = useSelector((state) => state.appreciate);
  const dispatch = useDispatch();
  const idCompany = jobDetail?.hr?.company.id;
  // console.log(jobListName);
  useEffect(() => {
    dispatch(getAppreciateByCompany(idCompany));
    dispatch(getJobByCompany(idCompany));
  }, []);

  const data = [];
  for (let i = 0; i < appreciateList?.length; i++) {
    data.push(appreciateList[i].score);
  }

  const res = data?.reduce((total, currentValue) => {
    return total + currentValue;
  }, 0);
  const rating = (res / data?.length).toFixed(2);
  return (
    <div>
      {jobList && jobList.length > 0 ? (
        <Detail
          jobDetail={jobDetail}
          demandPartner={demandPartner}
          rating={rating}
          jobListCompany={jobListCompany}
          jobDetailById={jobDetailById}
        />
      ) : (
        (
          <Detail demandPartner={demandPartner} jobDetailById={jobDetailById} />
        ) || null
      )}
    </div>
  );
};

DetailCard.propTypes = {
  logo: PropTypes.string.isRequired,
  nameMajor: PropTypes.string,
  nameCompany: PropTypes.string,
  detailJob: PropTypes.string,
  requireJob: PropTypes.string,
  timeJob: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  salary: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default DetailCard;
