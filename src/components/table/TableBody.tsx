import React from 'react';
import { Row } from 'react-table';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import MuiTableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow';

import { ACTIONS } from 'utils/constants';

const useStyles = makeStyles((theme: Theme) => createStyles({
  row: props =>({
    '&:nth-child(even)': {
      background: theme.palette.grey['100'],
    }
  }),
}));

interface TableBodyProps {
  page: Array<Row<Object>>;
  prepareRow: (row: Row<Object>) => void;
};

const TableBody: React.FunctionComponent<TableBodyProps> = (props) => {
  const classes = useStyles();
  const { page, prepareRow } = props;

  return (
    <MuiTableBody>
      {page.map(row => {
        prepareRow(row);
        return (
          <TableRow
            {...row.getRowProps()}
            className={classes.row}
          >
            {row.cells.map(cell => {
              return (
                <TableCell
                  {...cell.getCellProps()}
                  padding={
                    cell.column.id === ACTIONS ?
                    "checkbox" :
                    "default"
                  }
                >
                  {cell.render('Cell')}
                </TableCell>
              )
            })}
          </TableRow>
        )
      })}
    </MuiTableBody>
  );
};

export default TableBody;
