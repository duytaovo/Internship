import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import React, { useEffect, useState } from "react";
import Button from "../../components/Button/";
import "./styles.scss";
import SelectAreaHome from "../SelectAreaHome";
import useQuery from "../../hooks/useQuery";

function SearchResultHome({
  onChange,
  onClick,
  bwidth,
  bheight,
  bwidthInput,
  bheightInput,
  mb,
  candidate_infomation,
}) {
  const [searchValue, setSearchValue] = useState("");
  const query = useQuery();
  useEffect(() => {
    const { name = "" } = query;
    setSearchValue(name);
  }, [query]);

  const onChangeSearch = (event) => {
    setSearchValue(event.target.value);
  };

  const search = (event) => {
    event.preventDefault();
    onClick && onClick(searchValue);
  };

  return (
    <div className="header__with-search onMobile onTablet">
      <form
        className="header__with-search-search "
        style={{
          width: bwidth ? `${bwidth}` : "",
          height: bheight ? `${bheight}` : "",
          marginBottom: mb ? `${mb}` : "",
        }}
      >
        <div className="header__with-search-search-wrap">
          <span className="search__icon">
            <SearchOutlinedIcon sx={{ color: "#04bf8a" }} />
          </span>
          <input
            type="text"
            className="header__with-search-search-1"
            required
            id="none"
            placeholder="Tìm kiếm"
            value={searchValue}
            onChange={onChangeSearch}
            style={{
              width: bwidthInput ? `${bwidthInput}` : "",
              height: bheightInput ? `${bheightInput}` : "",
            }}
          />
        </div>
        <div className="header__with-search-search-select header__with-search-search-select-onMobile">
          <AddLocationIcon sx={{ color: "#04bf8a" }} />
          <SelectAreaHome onChange={onChange} />
        </div>
        <div className="header__with-search-button-search" onClick={search}>
          {candidate_infomation ? (
            <Button name="Tìm kiếm" bwidth="123px" bheight="38px" />
          ) : (
            <Button name="Tìm kiếm" bwidth="125px" bheight="50px"></Button>
          )}
        </div>
      </form>
    </div>
  );
}

SearchResultHome.propTypes = {};

export default SearchResultHome;
