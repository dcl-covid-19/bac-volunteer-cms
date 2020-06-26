import React from 'react';
import { Column } from 'react-table';
import { makeStyles } from '@material-ui/core/styles';

import { VALIDATORS } from 'utils/constants';

const useStyles = makeStyles(theme => ({
  error: {
    background: theme.palette.error.light,
  },
}));

interface ErrorCellProps {
  value: any;
  column: Column<Object>;
}

const ErrorCell: React.FunctionComponent<ErrorCellProps> = (props) => {
  const classes = useStyles();
  const { column } = props;
  const value = column.id === 'last_update' ? (
    new Date(props.value).toLocaleString(
      'en-US', { timeZoneName: 'short' }
    )
  ) : props.value;
  const hasErrors = column.id && VALIDATORS[column.id] &&
      !VALIDATORS[column.id](value);

  return (
    hasErrors ?
      <div className={classes.error}>{value}</div> :
      (value != null ? value.toString() : null)
  );
};

export default ErrorCell;
