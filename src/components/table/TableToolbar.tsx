import React from 'react';
import clsx from 'clsx';
import { createStyles, lighten, makeStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';

import NewResourceButton from './NewResourceButton';
import Search from './Search';
import { IResource } from 'utils/constants';

const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight: {
      color: theme.palette.primary.dark,
      backgroundColor: lighten(theme.palette.primary.light, 0.85),
    },
    title: {
      flex: '1 1 100%',
    },
  }),
);

interface TableToolbarProps {
  numSelected: number;
  globalFilter: string;
  setGlobalFilter: (filterValue: string) => void;
  newResourceHandler: (resource: IResource) => void;
  deleteHandler: (event: React.MouseEvent<HTMLElement>) => void;
}

const TableToolbar: React.FunctionComponent<TableToolbarProps> = (props) => {
  const classes = useToolbarStyles();
  const {
    numSelected,
    globalFilter,
    setGlobalFilter,
    newResourceHandler,
    deleteHandler
  } = props;
  const selected = numSelected > 0;
  const onSearchChange = (value: string) => setGlobalFilter(value);

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: selected,
      })}
    >
      {selected ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Drafts (Fake Data For Demo)
        </Typography>
      )}
      {selected ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete" onClick={deleteHandler}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <>
          <Search onSearchChange={onSearchChange} globalFilter={globalFilter}/>
          <NewResourceButton newResourceHandler={newResourceHandler}/>
        </>
      )}
    </Toolbar>
  );
};

export default TableToolbar;
