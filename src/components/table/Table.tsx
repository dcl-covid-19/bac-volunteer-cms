import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import MaUTable from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import {
  useColumnOrder,
  useFilters,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
  Column,
} from 'react-table';

import ActionButtonsCell from './ActionButtonsCell';
import ActionButtonsHeader from './ActionButtonsHeader';
import ErrorCell from './ErrorCell';
import TableBody from './TableBody';
import TableHeader from './TableHeader';
import TablePaginationActions from './TablePaginationActions';
import TableToolbar from './TableToolbar';
import { IResource, ACTIONS, DEFAULT_SHOWN } from 'utils/constants';
import { applyResourceConditions, complement } from 'utils/resource';

const useStyles = makeStyles((theme: Theme) => createStyles({
  footer: {
    minHeight: "54px",
    border: 0,
    borderTopWidth: "1px",
    borderTopColor: "#e0e0e0",
    borderStyle: "solid",
  },
}));

interface TableProps {
  columns: readonly Column<Object>[];
  data: readonly IResource[];
  setData: (data: IResource[]) => void;
  updateRow: (rowIndex: number, value: IResource) => void;
  skipPageResetRef: React.MutableRefObject<boolean | undefined>;
};

const Table: React.FunctionComponent<TableProps> = (props) => {
  const classes = useStyles();
  const { data, setData, columns, updateRow, skipPageResetRef } = props;
  React.useEffect(() => {
    skipPageResetRef.current = false;
  });
  const defaultColumn = { Cell: ErrorCell };
  const actionsColumn = {
    id: ACTIONS,
    Header: ActionButtonsHeader,
    Cell: ActionButtonsCell,
  };
  const columnOrder = applyResourceConditions(DEFAULT_SHOWN, 'all');
  const tableMethods = useTable(
    {
      columns: columns as Column<Object>[],
      data: data as Object[],
      defaultColumn,
      initialState: {
        columnOrder,
        hiddenColumns: complement(columnOrder)
      },
      autoResetPage: !skipPageResetRef.current,
      autoResetSortBy: !skipPageResetRef.current,
      autoResetFilters: !skipPageResetRef.current,
      autoResetGlobalFilter: !skipPageResetRef.current,
      updateRow,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    useColumnOrder,
    hooks => hooks.allColumns.push(columns => [actionsColumn, ...columns]),
  );
  const {
    getTableProps,
    headerGroups,
    prepareRow,
    rows,
    page,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize, selectedRowIds },
  } = tableMethods;

  const handleChangePage = (
    event: React.MouseEvent<HTMLElement> | null,
    newPage: number,
  ) => gotoPage(newPage);
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => setPageSize(Number(event.target.value));
  const newResourceHandler = (resource: IResource) => {
    skipPageResetRef.current = true;
    setData(data.concat([{ ...resource, last_update: new Date() }]));
  }
  const removeByIndexs = (
    array: readonly IResource[],
    indexs: number[],
  ) => array.filter((_, i) => !indexs.includes(i));
  const deleteHandler = (event: React.MouseEvent<HTMLElement>) => {
    skipPageResetRef.current = true;
    const newData = removeByIndexs(
      data,
      Object.keys(selectedRowIds).map(x => parseInt(x, 10)),
    );
    setData(newData);
  };

  return (
    <>
      <TableToolbar
        tableMethods={tableMethods}
        newResourceHandler={newResourceHandler}
        deleteHandler={deleteHandler}
        skipPageResetRef={skipPageResetRef}
      />
      <TableContainer>
        <MaUTable {...getTableProps()} stickyHeader size="small">
          <TableHeader headerGroups={headerGroups} />
          <TableBody page={page} prepareRow={prepareRow} />
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
