import React from 'react';

import MaUTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { useGlobalFilter, usePagination, useRowSelect, useSortBy, useTable, Column } from 'react-table';

import * as results from 'constants/grocery.json';

import TableToolbar from './TableToolbar';
import { selectColumn, dataColumns } from './Columns';

const Table = () => {
    const data: Object[] = React.useMemo(() => results.rows, []);
    // const keys: string[] = Object.keys(results.rows[0]) || ['provider_name'];
    // const namedCols = keys.map(key => ({ Header: key, accessor: key as any }));
    const columns = React.useMemo(() => dataColumns as Column<Object>[], []);

    const {
        getTableProps,
        headerGroups,
        prepareRow,
        rows,
        page,
        gotoPage,
        setPageSize,
        setGlobalFilter,
        state: { pageIndex, pageSize, selectedRowIds },
    } = useTable(
        { columns, data },
        useGlobalFilter,
        useSortBy,
        usePagination,
        useRowSelect,
        hooks => hooks.allColumns.push(columns => [selectColumn, ...columns]),
    );

    const handleChangePage = (event: any, newPage: number) => gotoPage(newPage);
    const handleChangeRowsPerPage = (event: any) => setPageSize(Number(event.target.value));

    return (
        <React.Fragment>
            <TableToolbar
                numSelected={Object.keys(selectedRowIds).length}
                setGlobalFilter={setGlobalFilter}
            />
            <TableContainer>
                <MaUTable {...getTableProps()} stickyHeader size="small">
                    <TableHead>
                        {headerGroups.map(headerGroup => (
                            <TableRow {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <TableCell
                                        {...(column.id === 'selection'
                                            ? column.getHeaderProps()
                                            : column.getHeaderProps(column.getSortByToggleProps()))}
                                    >
                                        {column.render('Header')}
                                        {column.id !== 'selection' ? (
                                            <TableSortLabel
                                                active={column.isSorted}
                                                // react-table has a unsorted state which is not treated here
                                                direction={column.isSortedDesc ? 'desc' : 'asc'}
                                            />
                                        ) : null}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableHead>
                    <TableBody>
                        {page.map(row => {
                            prepareRow(row);
                            return (
                                <TableRow {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return (
                                            <TableCell {...cell.getCellProps()}>
                                                {cell.render('Cell')}
                                            </TableCell>
                                        )
                                    })}
                                </TableRow>
                            )
                        })}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[
                                    5,
                                    10,
                                    25,
                                    { label: 'All', value: data.length },
                                ]}
                                count={rows.length}
                                rowsPerPage={pageSize}
                                page={pageIndex}
                                SelectProps={{
                                    inputProps: { 'aria-label': 'rows per page' },
                                    native: true,
                                }}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                            />
                        </TableRow>
                    </TableFooter>
                </MaUTable>
            </TableContainer>
        </React.Fragment>
    );
};

export default React.memo(Table);
