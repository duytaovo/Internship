import React, { useEffect, useState } from "react";
import "./styles.scss";
import Grid from "@mui/material/Grid";
import Button from "../Button";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { getDemandListByUniId } from "src/store/slices/main/home/demand/demandSlice";

const currentPage = 1;
const limit = 5;

const BaseInformationUniversity = ({
  demandDetail,
  demandListUni,
  pl,
  pr,
  ml,
  mt,
  pdLeft,
  pdRight,
  pdTop,
  pdBottom,
  mgLeft,
}) => {
  const location = useLocation();
  const pathUrl = location.pathname;
  const dispatch = useDispatch();
  const { demandListUniversity } = useSelector((state) => state.demand);
  const uniId = demandDetail?.universityDTO?.id;

  useEffect(() => {
    dispatch(getDemandListByUniId({ uniId, currentPage, limit }));
  }, [dispatch, uniId]);

  return (
    <div className="">
      <div>
        <div>
          {demandDetail && (
            <div className="base__information">
              <div className="base__information-card">
                <img
                  className="img-logo"
                  alt=""
                  src="https://r2s.com.vn/wp-content/uploads/2020/04/r2s.com_.vn_.png"
                />
                <div className="base__information-card-detail">
                  <h3 className="university-name">
                    {demandDetail?.partner?.universityDTO?.name}
                  </h3>
                  <div className="">
                    <h5>Số điện thoại: </h5>
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{
                        fontSize: 17,
                        fontWeight: "400",
                        transform: "translate(5px,5px)",
                      }}
                    >
                      {demandDetail?.partner?.universityDTO?.phone}
                    </Typography>
                  </div>
                  <div className="">
                    <h5>
                      Email:
                      <a
                        href={demandDetail?.partner?.universityDTO?.email}
                        className="fix-fontSize"
                      >
                        {demandDetail?.partner?.universityDTO?.email}
                      </a>
                    </h5>
                  </div>
                  <div className="detail-website">
                    <div className="">
                      <h5>Website: </h5>
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{
                          fontSize: 17,
                          fontWeight: "400",
                          transform: "translate(5px,5px)",
                        }}
                      >
                        {demandDetail?.partner?.universityDTO?.website}
                      </Typography>
                    </div>

                    <div className=" base__information-card-detail-location">
                      <h5 className="">Địa điểm:</h5>
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{
                          fontSize: 17,
                          fontWeight: "400",
                          transform: "translate(5px,5px)",
                        }}
                      >
                        {`${demandDetail?.partner?.universityDTO?.address}`}
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
              <div className="intro__university">
                <h5 className="intro__university-title">
                  Giới thiệu về Trường
                </h5>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    fontSize: 17,
                    fontWeight: "400",
                    transform: "translate(5px,5px)",
                  }}
                ></Typography>
              </div>

              {pathUrl !== "/information_company" ? (
                <div className="button-card">
                  <Link
                    to={`/partner/information_school/${demandDetail?.partner?.universityDTO.id}`}
                  >
                    <Button
                      name="Xem thêm"
                      bwidth="130px"
                      bheight="40px"
                    ></Button>
                  </Link>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

BaseInformationUniversity.propTypes = {};

export default BaseInformationUniversity;
