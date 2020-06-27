import React from 'react';
import { Column, Row } from 'react-table';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

import { lastUpdated } from 'utils/resource';
import { IResource, VALIDATORS } from 'utils/constants';

const useStyles = makeStyles(theme => ({
  error: {
    background: theme.palette.error.light,
    width: '100%',
    height: '100%',
    minWidth: '100%',
    minHeight: '100%',
  },
}));

interface ErrorCellProps {
  value: any;
  row: Row<IResource>;
  column: Column<Object>;
}

const ErrorCell: React.FunctionComponent<ErrorCellProps> = (props) => {
  const classes = useStyles();
  const { column, row: { original } } = props;
  const value = column.id === 'last_update' ?
      new Date(props.value).toISOString().split('T')[0] : props.value;
  const hasError = column.id && VALIDATORS[column.id] &&
      !VALIDATORS[column.id](value);
  const last_updated = column.id && lastUpdated(original, column.id);

  return last_updated != null ? (
    <Tooltip
      arrow
      title={`Last Updated: ${last_updated.toDateString()}`}
      className={clsx({ [classes.error]: hasError })}
    >
      <div>
        {value != null ? value.toString() : null}{'\xa0'}
      </div>
    </Tooltip>
  ) : (
    hasError ?
      <div className={classes.error}>{value}{'\xa0'}</div> :
      (value != null ? value.toString() : null)
  );
};

export default ErrorCell;
