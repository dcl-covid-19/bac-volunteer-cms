import React from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import MaUTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { useGlobalFilter, usePagination, useRowSelect, useSortBy, useTable, Column } from 'react-table';

import ActionButtonsCell from './ActionButtonsCell';
import ActionButtonsHeader from './ActionButtonsHeader';
import ErrorCell from './ErrorCell';
import TablePaginationActions from './TablePaginationActions';
import TableToolbar from './TableToolbar';
import { IResource } from 'utils/constants';

const useStyles = makeStyles((theme: Theme) => createStyles({
  footer: {
    minHeight: "54px",
    border: 0,
    borderTopWidth: "1px",
    borderTopColor: "#e0e0e0",
    borderStyle: "solid",
  },
  header: {
    backgroundColor: theme.palette.grey['200'],
  },
  zebra: {
    backgroundColor: theme.palette.grey['100'],
  },
}));

interface TableProps {
  columns: readonly Column<Object>[];
  data: readonly IResource[];
  setData: (data: IResource[]) => void;
  updateRow: (rowIndex: number, value: IResource) => void;
};

const Table: React.FunctionComponent<TableProps> = (props) => {
  const classes = useStyles();
  const { data, setData, columns, updateRow } = props;
  const defaultColumn = { Cell: ErrorCell };
  const actionsColumn = {
    id: 'selection',
    Header: ActionButtonsHeader,
    Cell: ActionButtonsCell,
  };
  const {
    getTableProps,
    headerGroups,
    prepareRow,
    rows,
    page,
    gotoPage,
    setPageSize,
    setGlobalFilter,
    state: { pageIndex, pageSize, selectedRowIds, globalFilter },
  } = useTable(
    {
      columns: columns as Column<Object>[],
      data: data as Object[],
      defaultColumn,
      updateRow
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    hooks => hooks.allColumns.push(columns => [actionsColumn, ...columns]),
  );

  const handleChangePage = (
    event: React.MouseEvent<HTMLElement> | null,
    newPage: number,
  ) => gotoPage(newPage);
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => setPageSize(Number(event.target.value));
  const newResourceHandler = (resource: IResource) => setData(
    data.concat([{ ...resource, last_update: new Date() }])
  );
  const removeByIndexs = (
    array: readonly IResource[],
    indexs: number[],
  ) => array.filter((_, i) => !indexs.includes(i));
  const deleteHandler = (event: React.MouseEvent<HTMLElement>) => {
    const newData = removeByIndexs(
      data,
      Object.keys(selectedRowIds).map(x => parseInt(x, 10)),
    );
    setData(newData);
  };

  return (
    <>
      <TableToolbar
        numSelected={Object.keys(selectedRowIds).length}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        newResourceHandler={newResourceHandler}
        deleteHandler={deleteHandler}
      />
      <TableContainer>
        <MaUTable {...getTableProps()} stickyHeader size="small">
          <TableHead>
            {headerGroups.map(headerGroup => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <TableCell
                    className={classes.header}
                    padding={
                      column.id === 'selection' ? "checkbox" : undefined
                    }
                    {...(column.id === 'selection'
                      ? column.getHeaderProps()
                      : column.getHeaderProps(column.getSortByToggleProps()))}
                  >
                    {column.id !== 'selection' ? (
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
          <TableBody stripedRows>
            {page.map(row => {
              prepareRow(row);
              return (
                <TableRow
                  {...row.getRowProps()}
                  className={clsx({ [classes.zebra]: row.index % 2 })}
                >
                  {row.cells.map(cell => {
                    return (
                      <TableCell
                        {...cell.getCellProps()}
                        padding={
                          cell.column.id === 'selection' ?
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
          </TableBody>
        </MaUTable>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[
          ...([5, 10, 25, 50, 100].filter((x: number) => (x < data.length))),
          { label: 'All', value: data.length },
        ]}
        component="div"
        count={rows.length}
        rowsPerPage={pageSize}
        page={pageIndex}
        SelectProps={{
          inputProps: { 'aria-label': 'rows per page' },
          native: true,
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        ActionsComponent={TablePaginationActions}
        className={classes.footer}
      />
    </>
  );
};

export default Table;
