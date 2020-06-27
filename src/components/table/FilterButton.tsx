import React from 'react';
import { useForm, FormContext } from 'react-hook-form';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FilterListIcon from '@material-ui/icons/FilterList';

interface FilterButtonProps { }

const FilterButton: React.FunctionComponent<FilterButtonProps> = () => {
  return (
    <>
      <Tooltip title="Advanced Filters">
        <IconButton aria-label="Advanced Filters" size="small">
          <FilterListIcon />
        </IconButton>
      </Tooltip>
    </>
  )
}

export default FilterButton;
