import React, { useEffect, useState } from "react";
// import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { IconButton, Tooltip } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import DataTable from "../../../../components/Table";
import { getUniversityList } from "../../../../store/slices/Admin/university/unversitySlice";
import ProfileTable from "../../../../components/ProfileTable";

const UniversityTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { universityList, totalPages, totalItems } = useSelector(
    (state) => state.university
  );

  useEffect(() => {
    dispatch(getUniversityList([page, 10]));
  }, [page]);
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "name",
      headerName: "Trường học",
      flex: 1,
      renderCell: (params) => {
        const { row } = params;
        return <ProfileTable row={row} />;
      },
    },
    { field: "shortName", headerName: "Tên viết tắt", width: 130 },

    // { field: "majors", headerName: "Chuyên ngành", width: 130 },
    { field: "createDate", headerName: "Ngày tạo", width: 150 },
    {
      field: "status",
      headerName: "Trạng thái",
      width: 150,
      renderCell: (params) => {
        const { row } = params;
        const handleChangeStatus = (e) => {};
        return (
          <select
            name={row.status}
            id={row.status}
            value={row.status || 0}
            onChange={(e) => handleChangeStatus(e)}
            className="company-table__select"
          >
            <option value={0}>Not verified</option>
            <option value={1}>Active</option>
            <option value={2}>Block</option>
            <option value={3}>Disable</option>
          </select>
        );
      },
    },
    {
      field: "action",
      headerName: "Chỉnh sửa",
      width: 120,
      sortable: false,
      renderCell: (params) => {
        const { row } = params;
        const handleClick = () => {
          // console.log(row);
          navigate(`/admin/university/${row.id}`);
        };
        return (
          <>
            <IconButton className="user-edit__button" onClick={handleClick}>
              <VisibilityOutlinedIcon />
            </IconButton>
            <Tooltip title="Chuyển trạng thái tài khoản">
              <IconButton className="user-delete__button">
                <DeleteForeverOutlinedIcon />
              </IconButton>
            </Tooltip>
          </>
        );
      },
    },
  ];

  const rows = [];
  for (let i = 0; i < universityList.length; i++) {
    rows.push({
      id: universityList[i].id,
      stt: i + 1,
      name: universityList[i].name,
      shortName: universityList[i].shortName,
      website: universityList[i].website,
      email: universityList[i].email,
      createDate: universityList[i].createDate
        ? moment(universityList[i].createDate).format("DD/MM/YYYY")
        : moment().format("DD/MM/YYYY"),
      status: universityList[i].status,
    });
  }

  const handlePagination = (e, value) => {
    setPage(value);
  };

  return (
    <>
      <DataTable
        rows={rows}
        columns={columns}
        totalPages={totalPages}
        totalItems={totalItems}
        handleOnChange={handlePagination}
      />
    </>
  );
};

export default UniversityTable;
