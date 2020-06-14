import React, { useState } from 'react';

import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';

interface SearchProps {
    onSearchChange: (value: string, setValue: (value: string) => void) => void,
    hidden: boolean,
};

const Search = (props: SearchProps) => {
    const { onSearchChange, hidden } = props;
    const [value, setValue] = useState("");
    return (
        <TextField
            style={hidden ? { display: "none" } : undefined}
            value={value}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                onSearchChange(event.target.value, setValue);
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
                            disabled={!value}
                            onClick={() => onSearchChange("", setValue)}
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
