import React from 'react';

import Checkbox from '@material-ui/core/Checkbox'
import MaUTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell'
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { usePagination, useRowSelect, useTable, Column, Row } from 'react-table';

import * as results from 'constants/grocery.json';
import COLUMNS from 'constants/columns';

import TableToolbar from './TableToolbar';

const Table = () => {
    const data: Object[] = React.useMemo(() => results.rows, []);
    // const keys: string[] = Object.keys(results.rows[0]) || ['provider_name'];
    // const namedCols = keys.map(key => ({ Header: key, accessor: key as any }));
    const columns = React.useMemo(() => COLUMNS as Column<Object>[], []);
    console.log(columns);

    const {
        getTableProps,
        headerGroups,
        prepareRow,
        page,
        gotoPage,
        setPageSize,
        state: { pageIndex, pageSize, selectedRowIds },
    } = useTable(
        { columns, data },
        usePagination,
        useRowSelect,
        hooks => {
            hooks.allColumns.push(columns => [
                {
                    id: 'selection',
                    Header: ({ getToggleAllRowsSelectedProps }) => (
                        <div>
                            <Checkbox {...getToggleAllRowsSelectedProps()} />
                        </div>
                    ),
                    Cell: ({ row } : { row: Row<Object> }) => (
                        <div>
                            <Checkbox {...row.getToggleRowSelectedProps()} />
                        </div>
                    ),
                },
                ...columns,
            ])
        },
    );

    const handleChangePage = (event: any, newPage: number) => gotoPage(newPage);
    const handleChangeRowsPerPage = (event: any) => setPageSize(Number(event.target.value));

    return (
        <MaUTable {...getTableProps()} stickyHeader size="small">
            <TableHead>
                {headerGroups.map(headerGroup => (
                    <TableRow {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <TableCell {...column.getHeaderProps()}>
                                {column.render('Header')}
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
                        count={data.length}
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
    );
};

export default Table;
