import { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import CardHome from "../CardHome";
import moment from "moment";
import "./styles.scss";
import { useLocation } from "react-router-dom";
import PaginationCustome from "src/components/Pagination";

function TabPanel(props) {
  const { children, value, index, jobList, ...other } = props;

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

const FilterPanelHome = ({
  jobList,
  indexCardActive,
  positionJobValue,
  positionValue,
  onChange,
  jobListHavePages,
}) => {
  const location = useLocation();
  const [value, setValue] = useState(0);
  const [page, setPage] = useState(1);
  const handleChange = (event, newValue) => setValue(newValue);
  const handlePagination = (e, valuePage) => {
    setPage(valuePage);
    onChange && onChange(valuePage);
  };
  return (
    <Box className="filter-panel-home__wrapper" sx={{}}>
      <Box className="filter-panel-home__filterPanel" sx={{}}>
        <Tabs
          value={value}
          onChange={handleChange}
          sx={{
            background: "#fff",
            borderRadius: "6px",
            padding: "8px 10px",
            border: "0.5px solid #dedede",
            "& button": {
              fontSize: "13px !important",
              textTransform: "none !important",
              color: "black !important",
              fontWeight: "600 !important",
              flexBasis: "33.33%",
            },
            "& button.Mui-selected": {
              color: "#fff !important",
              background: "#04bf8a",
              borderRadius: "4px",
            },
            "& span.MuiTabs-indicator": {
              backgroundColor: "unset !important",
            },
          }}
        >
          <Tab label="Mới nhất" {...a11yProps(0)} />
          <Tab label="Đánh giá" {...a11yProps(1)} />
          <Tab label="Liên quan" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel className="tabPanel" value={value} index={0}>
        {jobList &&
          jobList?.length > 0 &&
          jobList.map((job, index) => (
            <CardHome
              page={page}
              positionValue={positionValue}
              id={job.id}
              active={indexCardActive}
              index={index}
              key={job.id}
              title={job.name}
              fontSize={10}
              nameCompany={
                job?.hr?.company?.name || job?.partner?.universityDTO.name
              }
              idCompany={job?.hr?.company?.id || job?.partner?.universityDTO.id}
              tagName={[
                job?.jobposition?.name || job?.position.name || "Không có",
                job?.jobType?.name || "Không có",
              ]}
              location="Hồ Chí Minh"
              amount={job.amount || "Không có"}
              demandPartner={true}
              time={[
                moment(job.timeStartStr || job.createDate).format("DD/MM/YYYY"),
                moment(job.timeEndStr || job.end).format("DD/MM/YYYY"),
              ]}
              locationPath={location.pathname}
            />
          ))}
      </TabPanel>
      <TabPanel value={value} index={1}></TabPanel>
      <TabPanel value={value} index={2}></TabPanel>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "16px",
        }}
      >
        <PaginationCustome
          page={page}
          totalPages={jobListHavePages.totalPages}
          hanldeOnChange={handlePagination}
        />
      </div>
    </Box>
  );
};
export default FilterPanelHome;
