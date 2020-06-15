import React from 'react';

import MaUTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { useGlobalFilter, usePagination, useRowSelect, useSortBy, useTable, Column } from 'react-table';

import TablePaginationActions from './TablePaginationActions';
import TableToolbar from './TableToolbar';
import { actionsColumn } from './Columns';
import ErrorCell from './ErrorCell';

interface TableProps {
    columns: Column<Object>[];
    data: Object[];
    setData: (data: any[]) => void;
    updateRow: (rowIndex: number, value: any) => void;
};

const Table = (props: TableProps) => {
    const { data, setData, columns, updateRow } = props;
    const defaultColumn = { Cell: ErrorCell };
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
        { columns, data, defaultColumn, updateRow },
        useGlobalFilter,
        useSortBy,
        usePagination,
        useRowSelect,
        hooks => hooks.allColumns.push(columns => [actionsColumn, ...columns]),
    );

    const handleChangePage = (event: any, newPage: number) => gotoPage(newPage);
    const handleChangeRowsPerPage = (event: any) => setPageSize(Number(event.target.value));
    const newResourceHandler = (resource: any) => setData(data.concat([resource]));
    const removeByIndexs = (array: Object[], indexs: number[]) => array.filter((_, i) => !indexs.includes(i));
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
            <TablePagination
                style={{ display: "flex", flexDirection: "row" as "row", padding: 0, height: "45px", overflow: "visible" }}
                rowsPerPageOptions={[
                    ...([5, 10, 25, 50, 100].filter((x: number) => (x < data.length))),
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
                ActionsComponent={TablePaginationActions}
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
                </MaUTable>
            </TableContainer>
        </>
    );
};

export default Table;
