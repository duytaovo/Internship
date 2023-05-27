import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardJob from "src/components/CardJob";
import FeedBack from "src/components/FeedBack";
import UserCard from "src/components/UserCard";
import {
  getJobCandidateCaredByNameAndLocation,
  getMarkByUser,
} from "src/store/slices/main/mark/markSlice";
import { TabTitle } from "src/utils/GeneralFunctions";
import "./styles.scss";
import Box from "@mui/material/Box";
import {
  getApplyListByIdCandidate,
  getJobCandidateAppliedByNameAndLocation,
} from "src/store/slices/main/candidate/apply/applySlice";
import SearchResultHome from "src/components/SearchResultHome";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowButton from "src/components/ArrowButton";
import { getCandidateByUserName } from "src/store/slices/main/candidate/info/infoCandidateSlice";
import { Grid, Pagination, Stack } from "@mui/material";

const limit = process.env.LIMIT_OF_PAGE || 5;

const CandidateViewList = () => {
  TabTitle("Danh sách ứng viên");

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const pathUrl = location.pathname;
  const [locationValue, setLocationValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState();
  const [emptyList, setEmpList] = useState("");
  // const jobCare = {};
  let { careListOfPrivate, careListOfPrivateHavePages } = useSelector(
    (state) => state.mark
  );
  let { applyList, applyListHavePage } = useSelector((state) => state.apply);
  const { candidateInfoByUsername } = useSelector(
    (state) => state.infoCandidate
  );
  const eleDuplicate = [];
  for (let i = 0; i < careListOfPrivate?.length; i++) {
    for (let j = 0; j < careListOfPrivate?.length; j++) {
      if (careListOfPrivate[i] === careListOfPrivate[j]) {
        eleDuplicate.push(careListOfPrivate[i]);
      }
    }
  }
  const { profile } = useSelector((state) => state.authentication);
  useEffect(() => {
    const _getValue = async () => {
      const dataGetMarkByUser = {
        userName: profile.username,
        page: {
          no: currentPage,
          limit: limit,
        },
      };

      await dispatch(getMarkByUser(dataGetMarkByUser));
      await dispatch(getCandidateByUserName(profile.username));

      const dataGetAppliedByCandidate = {
        idCandidate: candidateInfoByUsername.id,
        page: {
          no: currentPage,
          limit: limit,
        },
      };
      await dispatch(getApplyListByIdCandidate(dataGetAppliedByCandidate));

      if (
        pathUrl === "/candidate/view-list-care" &&
        careListOfPrivate?.length === 0
      ) {
        setEmpList();
        // "Bạn chưa có công việc nào được thêm vào danh sách quan tâm"
      }

      if (
        pathUrl === "/candidate/view-list-apply" &&
        careListOfPrivate?.length === 0
      ) {
        // setEmpList("Bạn chưa ứng tuyển công việc nào");
      }
    };
    _getValue();
  }, [candidateInfoByUsername.id]);

  useEffect(() => {}, []);
  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };
  const handleBackClick = () => {
    navigate(-1);
  };

  const handleSearch = async (value) => {
    await dispatch(getCandidateByUserName(profile.username));
    dispatch(getApplyListByIdCandidate(candidateInfoByUsername.id));
    const dataSearch = {
      idCandidate: candidateInfoByUsername?.id,
      valueSearch: {
        name: value || "",
        // province: locationValue,
        // // .replace(/%20/g, "+")
        // // .replace(/\s/g, "-") || "",
        no: 0,
        limit: limit,
      },
    };
    if (pathUrl === "/candidate/view-list-care") {
      dispatch(getJobCandidateCaredByNameAndLocation(dataSearch));
      // navigate(
      //   `/candidate` +
      //     `?name=${value || ""}&province=${
      //       encodeURIComponent(locationValue)
      //         .replace(/%20/g, "+")
      //         .replace(/\s/g, "-") || ""
      //     }&no=0&limit=10`
      // );
    }

    if (pathUrl === "/candidate/view-list-apply") {
      dispatch(getJobCandidateAppliedByNameAndLocation(dataSearch));
    }
    // navigate(
    //   `/candidate` +
    //     `?name=${value || ""}&province=${
    //       encodeURIComponent(locationValue)
    //         .replace(/%20/g, "+")
    //         .replace(/\s/g, "-") || ""
    //     }&no=0&limit=10`
    // );
  };

  const getValueLocationAndHandle = (value) => {
    setLocationValue(value);
  };

  const handlePagination = (page) => {
    // console.log(typeof page);
    setCurrentPage(parseInt(page));
    window.scroll(0, 0);
  };

  useEffect(() => {
    setTotalPage(
      careListOfPrivateHavePages?.totalPages || applyListHavePage?.totalPages
    );
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <div className="view-list">
        <div className="">
          <Grid container spacing={2}>
            <Grid item xs={7}>
              <div className="view-list__job-card">
                {pathUrl === "/candidate/view-list-care" &&
                careListOfPrivate?.length > 0
                  ? careListOfPrivate.map((jobCare) => (
                      <CardJob
                        key={jobCare.id}
                        jobCare={jobCare}
                        eleDuplicate={eleDuplicate}
                      />
                    ))
                  : // <h3>{emptyList}</h3>
                    ""}

                {pathUrl === "/candidate/view-list-apply" &&
                  applyList?.map((jobApplied) => (
                    <CardJob
                      key={jobApplied.id}
                      jobApplied={jobApplied}
                      eleDuplicate={eleDuplicate}
                    />
                  ))}
              </div>
              <div
                className="view-list-page"
                style={{
                  display: "flex",
                  justifyContent: "start",
                  flexDirection: "row-reverse",
                  alignItems: "center",
                }}
              >
                <Stack spacing={2}>
                  <Pagination
                    page={careListOfPrivateHavePages?.numberOfCurrentPage || 0}
                    defaultPage={1}
                    onChange={(e) => handlePagination(e.target.textContent)}
                    count={totalPage || 1}
                    variant="outlined"
                    shape="rounded"
                    size="medium"
                    sx={{
                      display: "flex",
                      justifyContent: "start",
                      flexDirection: "row-reverse",
                      alignItems: "center",
                      marginLeft: "150px",
                    }}
                    // disabled={
                    //   jobListNameHavePages?.numberOfCurrentPage === 1 ||
                    //   jobListNameHavePages?.numberOfCurrentPage ===
                    //     jobListNameHavePages?.totalPages
                    // }
                  />
                </Stack>
                <div className="demand-detail__back" onClick={handleBackClick}>
                  <ArrowButton
                    direction="left"
                    text="Trở lại"
                    fontSize="15px"
                  />
                </div>
              </div>
            </Grid>
            <Grid item xs={5}>
              <div className="view-list__job-user-card">
                <div className="">
                  <SearchResultHome
                    // bwidth="680px"
                    bheight="60px"
                    bwidthInput="100px"
                    bheightInput
                    mb="0"
                    onChange={getValueLocationAndHandle}
                    onClick={handleSearch}
                  />
                </div>
                <UserCard />
                <FeedBack />
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </Box>
  );
};

export default CandidateViewList;
