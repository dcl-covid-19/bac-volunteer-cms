import React from 'react';
import { HeaderGroup } from 'react-table';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';

import { ACTIONS } from 'utils/constants';

const useStyles = makeStyles((theme: Theme) => createStyles({
  header: {
    backgroundColor: theme.palette.grey['200'],
  },
}));

interface TableHeaderProps {
  headerGroups: Array<HeaderGroup<Object>>;
};

const TableHeader: React.FunctionComponent<TableHeaderProps> = (props) => {
  const classes = useStyles();
  const { headerGroups } = props;

  return (
    <TableHead>
      {headerGroups.map(headerGroup => (
        <TableRow {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map(column => (
            <TableCell
              className={classes.header}
              padding={
                column.id === ACTIONS ? "checkbox" : "default"
              }
              {...(column.id === ACTIONS
                ? column.getHeaderProps()
                : column.getHeaderProps(column.getSortByToggleProps()))}
            >
              {column.id !== ACTIONS ? (
                <TableSortLabel
                  active={column.isSorted}
                  direction={column.isSortedDesc ? 'desc' : 'asc'}
                >
                  {column.render('Header')}
                </TableSortLabel>
              ) : column.render('Header')}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableHead>
  );
};

export default TableHeader;
