import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';

interface SearchProps {
  onSearchChange: (value: string) => void;
  globalFilter: string;
};

const Search = (props: SearchProps) => {
  const { onSearchChange, globalFilter } = props;
  return (
    <TextField
      value={globalFilter || ''}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        onSearchChange(event.target.value);
      }}
      placeholder="Search..."
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Tooltip title="Search">
              <SearchIcon fontSize="small" />
            </Tooltip>
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              disabled={!globalFilter}
              onClick={() => onSearchChange("")}
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          </InputAdornment>
        ),
        inputProps: { 'aria-label': "Search" },
      }}
    />
  );
};

export default Search;
