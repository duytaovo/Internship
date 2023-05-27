import { useEffect, useState } from "react";
import Button from "../../../../components/Button";
import "./styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { TabTitle } from "src/utils/GeneralFunctions";
import { getPartnerByUserID } from "src/store/slices/Admin/university/unversitySlice";
import { getDemandListByUniId } from "src/store/slices/main/home/demand/demandSlice";
import { ListDemand } from "./ListDemand";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import { Tab, Tabs } from "@mui/material";
import Statistic from "src/components/Statistic";
import { useNavigate } from "react-router-dom";
import PaginationCustom from "src/components/Pagination";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, padding: 0 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const limit = 5;
const PartnerPostList = (props) => {
  TabTitle("Danh sách bài đăng | IT Internship JOBS");
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { activeUser } = useSelector((state) => state.university);
  const handleChange = (event, newValue) => setValue(newValue);
  const { demandListUniversity, demandListUniversityActive } = useSelector(
    (state) => state.demand
  );

  console.log(demandListUniversityActive);
  const userPresent = JSON.parse(sessionStorage.getItem("userPresent"));
  const [currentPage, setCurrentPage] = useState(1);
  // console.log(currentPage, totalPage);
  // console.log(demandListUniversity?.totalPages);
  // console.log(activeUser?.universityDTO?.id);

  const handlePaginate = (page) => {
    setCurrentPage(parseInt(page));
    window.scroll(0, 0);
  };

  useEffect(() => {
    let uniId = activeUser?.universityDTO?.id;
    // console.log(currentPage);
    dispatch(getDemandListByUniId({ uniId, currentPage, limit }));
  }, [activeUser?.universityDTO?.id, currentPage]);

  useEffect(() => {
    dispatch(getPartnerByUserID(userPresent.idUser));
  }, [userPresent.idUser]);

  // console.log(partnerPostList);
  return (
    <div className="partner-post__wrapper">
      <div className="partner-post__list-bt">
        <Button
          onClick={() => {
            navigate("/partner/post");
          }}
          name="ĐĂNG BÀI"
        ></Button>
      </div>
      <div className="partner-post-list__content">
        <div className="partner-post-list__statistic">
          <Statistic
            title="Điểm khả dụng"
            firstObject={{
              score: demandListUniversity?.totalItems,
              description: "Lượt đăng tuyển",
            }}
            secondObject={{
              score: 0,
              description: "Lượt xem hồ sơ",
            }}
          />
          <Statistic
            title="Trạng thái tin đăng"
            firstObject={{
              score: demandListUniversity?.totalItems,
              description: "Đang đăng tuyển",
            }}
            secondObject={{
              score: 0,
              description: "Đã đóng",
            }}
          />
        </div>
        <Box className="filter-panel-home__wrapper" sx={{}}>
          <Box className="filter-panel-home__filterPanel" sx={{}}>
            <Tabs
              value={value}
              onChange={handleChange}
              sx={{
                "& button": {
                  fontSize: "14px !important",
                  textTransform: "uppercase",
                  color: "black !important",
                  fontWeight: "700 !important",
                  flexBasis: "50%",
                },
                "& button.Mui-selected": {
                  color: "#fff !important",
                  background: "#04bf8a",
                  borderRadius: "4px",
                  "&#simple-tab-1": {
                    backgroundColor: "#666 !important",
                  },
                },
                "& span.MuiTabs-indicator": {
                  backgroundColor: "unset !important",
                },
              }}
            >
              <Tab label="Đang đăng tuyển" {...a11yProps(0)} />
              <Tab label="Đã đóng" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel className="tabPanel" value={value} index={0}>
            <ListDemand
              demandList={demandListUniversityActive}
              message="Không có đợt thực tập đăng tuyển."
            />
          </TabPanel>
          <TabPanel className="tabPanel" value={value} index={1}>
            <ListDemand
              demandList={undefined}
              message="Không có đợt thực tập đã đóng."
            />
          </TabPanel>
          <div className="partner-postList__pagination">
            <PaginationCustom
              page={currentPage}
              totalPages={demandListUniversity?.totalPages}
              hanldeOnChange={(e) => handlePaginate(e.target.textContent)}
            />
          </div>
        </Box>
      </div>
    </div>
  );
};

export default PartnerPostList;
