import React from 'react';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  TablePaginationActionsProps
} from '@material-ui/core/TablePagination/TablePaginationActions';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
  }),
);

const TablePaginationActions: (
  React.FunctionComponent<TablePaginationActionsProps>
) = (props) => {
  const classes = useStyles();
  const { count, page, rowsPerPage, onChangePage } = props;

  const maxPages = Math.max(0, Math.ceil(count / rowsPerPage) - 1);
  const handleFirstPageButtonClick =
      (event: React.MouseEvent<HTMLButtonElement>) => onChangePage(event, 0);
  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => onChangePage(event, page - 1);
  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => onChangePage(event, page + 1);
  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => onChangePage(event, maxPages);

  return (
    <div className={classes.root}>
      <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0}>
        <FirstPageIcon />
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0}>
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton onClick={handleNextButtonClick} disabled={page >= maxPages}>
        <KeyboardArrowRight />
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= maxPages}
      >
        <LastPageIcon />
      </IconButton>
    </div>
  );
}

export default TablePaginationActions;
