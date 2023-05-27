import { Grid } from "@mui/material";
import SearchResultHome from "src/components/SearchResultHome";
import DetailCard from "src/components/DetailCard";
import SideBarHomeList from "src/components/SideBarHomeList";
import FilterPanelHome from "src/components/FilterPanelHome";
import "./styles.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import {
//   getJobByName,
//   getJobByNameAndLocation,
//   getJobList,
// } from "src/store/slices/main/home/job/jobSlice";
import {
  getDemandByName,
  getDemandList,
} from "src/store/slices/main/home/demand/demandSlice";
import PaginationCustom from "src/components/Pagination";
import { useNavigate, useParams } from "react-router-dom";

const limit = 5;

const PartnerHomePage = (props) => {
  // const [valueSearch, setValueSearch] = useState("");
  const [locationValue, setLocationValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSearchPage, setCurrentSearchPage] = useState(1);
  const dispatch = useDispatch();
  // get global state from redux store
  const {
    demandList,
    totalPagesofDemandList,
    demandDetail,
    indexPartnerCardActive,
  } = useSelector((state) => state.demand);

  const navigate = useNavigate();
  const { keyword } = useParams();

  // console.log(demandDetail, indexPartnerCardActive);
  // console.log(totalPagesofDemandList);

  const handlePaginate = (page) => {
    console.log(page);
    keyword
      ? setCurrentSearchPage(parseInt(page))
      : setCurrentPage(parseInt(page));
    window.scroll(0, 0);
  };

  useEffect(() => {
    console.log(currentPage);
    dispatch(getDemandList({ currentPage, limit }));
  }, [currentPage]);

  // useEffect(() => {
  //   const dataSearch = {
  //     name: keyword || "",
  //     no: currentSearchPage - 1,
  //     limit: 5,
  //   };
  //   dispatch(getDemandByName(dataSearch));
  // }, [keyword, currentSearchPage]);

  const handleSearch = (value) => {
    value = value.replace("%20", "+");
    const dataSearch = {
      name: value || "",
      no: currentSearchPage - 1,
      limit: 5,
    };
    if (value) {
      navigate(`/partner/search/${value}`);
    } else {
      navigate(`/partner`);
    }
    dispatch(getDemandByName(dataSearch));
  };

  const getValueLocationAndHandle = (value) => {
    setLocationValue(value);
  };

  return (
    <>
      {demandDetail && (
        <Grid
          className="wrapper"
          spacing={{ xs: 1 }}
          sx={{ padding: "18px" }}
          container
        >
          <Grid item lg={2} md={3} sm={4} xs={12}>
            <SideBarHomeList />
          </Grid>
          <Grid item lg={4} md={8} sm={8} xs={12}>
            <div className="onDesktop">
              <SearchResultHome
                onClick={handleSearch}
                onChange={getValueLocationAndHandle}
              />
            </div>

            <FilterPanelHome
              jobList={demandList}
              partnerRole={true}
              indexCardActive={indexPartnerCardActive}
            />
            <div className="partner-postList__pagination">
              <PaginationCustom
                page={keyword ? currentSearchPage : currentPage}
                totalPages={totalPagesofDemandList}
                hanldeOnChange={(e) => handlePaginate(e.target.textContent)}
              />
            </div>
          </Grid>
          <Grid item lg={6} className="onTablet">
            <div className="containerDetailCard containerDetailCard-none">
              <div className="none__res">
                <SearchResultHome
                  onClick={handleSearch}
                  onChange={getValueLocationAndHandle}
                />
              </div>
              {demandList ? (
                <DetailCard
                  logo="https://r2s.edu.vn/wp-content/uploads/2021/05/r2s.com_.vn_-316x190.png"
                  jobList={demandList}
                  jobDetail={demandDetail}
                  demandPartner={true}
                />
              ) : (
                <div>Nothing here</div>
              )}
            </div>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default PartnerHomePage;
