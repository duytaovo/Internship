import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

import "./styles.scss";
import { Select } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getProvinceList } from "../../store/slices/location/locationSlice";
const ITEM_HEIGHT = 30;
const ITEM_PADDING_TOP = 0;
const MenuProps = {
  PaperProps: {
    style: {
      // maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: "70px !important",
      maxHeight: "none !important",
      height: "200px",
    },
  },
};

export default function SelectAreaHome({ onChange }) {
  const [personName, setPersonName] = React.useState("");

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
    onChange && onChange(value);
  };

  const dispatch = useDispatch();
  const { provinceList } = useSelector((state) => state.location);

  React.useEffect(() => {
    dispatch(getProvinceList());
  }, [dispatch]);

  return (
    <div>
      <FormControl sx={{ m: 1, width: 170, pl: 1 }}>
        {/* <h6>Khu vực</h6> */}
        {/* <InputLabel id="demo-multiple-name-label">Khu Vực </InputLabel> */}
        <div className="config-select">
          <Select
            labelId="demo-multiple-name-label"
            // id="demo-multiple-name"
            value={personName}
            onChange={handleChange}
            // input={<OutlinedInput />}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return (
                  <p id="demo-multiple-name-label" className="text-location">
                    Khu vực
                  </p>
                );
              }

              return selected;
            }}
            MenuProps={MenuProps}
            sx={{
              color: "#04bf8a",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "transparent !important",
              },
              "& .MuiSelect-nativeInput": {
                position: "relative !important",
              },
              "& .MuiSelect-icon": {
                color: "#04bf8a",
              },
              "& div": {
                textOverflow: "unset !important",
              },
              mr: 2,
            }}
            multiple={false}
            displayEmpty
          >
            {/* <MenuItem disabled value="">
              <InputLabel id="demo-multiple-name-label">Khu vực</InputLabel>
            </MenuItem> */}
            {provinceList.map((province) => (
              <MenuItem
                key={province.id}
                value={province.name}
                // style={getStyles(province.id, personName, theme)}
                sx={{
                  "& .MuiFormLabel-root-MuiInputLabel-root.Mui-focused": {
                    display: "none",
                  },
                }}
              >
                {province.name}
              </MenuItem>
            ))}
          </Select>
        </div>
      </FormControl>
    </div>
  );
}
