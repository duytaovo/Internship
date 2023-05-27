import React from 'react'
import { IconButton } from '@mui/material'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import './styles.scss'

const Search = ({ placeholder, onChange, width }) => {
  return (
    <div style={{ width: width }} className="search">
      <input
        className="search__input"
        type="search"
        placeholder={`${placeholder}...`}
        onChange={onChange}
      />
      <div>
        <IconButton className="search__icon">
          <SearchOutlinedIcon />
        </IconButton>
      </div>
    </div>
  )
}

export default Search
