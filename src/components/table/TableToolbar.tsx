import React from 'react';
import { TableInstance } from 'react-table';
import clsx from 'clsx';
import { createStyles, lighten, makeStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';

import FilterButton from './FilterButton';
import NewResourceButton from './NewResourceButton';
import { IListResult } from './ReorderList';
import ReorderButton from './ReorderButton';
import { ResourceType, ResourceTypeDropdown } from './ResourceTypeDropdown';
import Search from './Search';
import { applyResourceConditions, complement } from 'utils/resource';
import { IResource, DEFAULT_SHOWN } from 'utils/constants';

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
  tableMethods: TableInstance<Object>;
  newResourceHandler: (resource: IResource) => void;
  deleteHandler: (event: React.MouseEvent<HTMLElement>) => void;
  skipPageResetRef: React.MutableRefObject<boolean | undefined>;
}

const TableToolbar: React.FunctionComponent<TableToolbarProps> = (props) => {
  const classes = useToolbarStyles();
  const {
    tableMethods,
    newResourceHandler,
    deleteHandler,
    skipPageResetRef,
  } = props;
  const {
    setFilter,
    setColumnOrder,
    setHiddenColumns,
    setGlobalFilter,
    state: { selectedRowIds, globalFilter },
  } = tableMethods;
  const [lists, setLists] = React.useState<IListResult>({
    shown: [ ...DEFAULT_SHOWN ],
    hidden: complement(DEFAULT_SHOWN),
  });
  const [resourceType, setResourceType] = React.useState<ResourceType>('all');
  React.useEffect(
    () => {
      skipPageResetRef.current = true;
      const columnOrder = applyResourceConditions(lists.shown, resourceType);
      setColumnOrder(columnOrder);
      setHiddenColumns(complement(columnOrder));
    },
    [skipPageResetRef, setColumnOrder, setHiddenColumns, lists, resourceType],
  );
  const numSelected = Object.keys(selectedRowIds).length;
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
          <ResourceTypeDropdown
            resourceType={resourceType}
            setResourceType={setResourceType}
            setFilter={setFilter}
          />
          <FilterButton />
          <ReorderButton lists={lists} setLists={setLists} />
          <NewResourceButton newResourceHandler={newResourceHandler}/>
        </>
      )}
    </Toolbar>
  );
};

export default TableToolbar;
