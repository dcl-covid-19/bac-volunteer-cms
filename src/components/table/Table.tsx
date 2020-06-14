import React from 'react';

//import DataTable from 'react-data-table-component';
import MaUTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell'
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { usePagination, useTable, Column } from 'react-table';

import * as results from 'constants/grocery.json';

const COLUMNS = [
    { Header: 'Provider Name', accessor: 'provider_name' },
    { Header: 'Resource', accessor: 'resource' },
    { Header: 'Region', accessor: 'region' },
    { Header: 'Address', accessor: 'address' },
    { Header: 'ZIP', accessor: 'zip' },
    { Header: 'Status', accessor: 'status' },
    { Header: 'Free', accessor: 'free' },
];

function Table() {
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
        state: { pageIndex, pageSize },
    } = useTable(
        { columns, data },
        usePagination,
    );

    const handleChangePage = (event: any, newPage: number) => gotoPage(newPage);
    const handleChangeRowsPerPage = (event: any) => setPageSize(Number(event.target.value));

    return (
        <MaUTable {...getTableProps()} size="small">
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
}
//const columns = keys.map(key => ({ name: key, selector: key, sortable: true }));

// class Table extends Component {
//     render() {
//         return (
//             <DataTable
//                 title="Dummy Bay Area Community DB"
//                 columns={columns}
//                 data={data}
//                 defaultSortField="last_update"
//                 fixedHeader
//                 expandableRows
//                 expandableRowsComponent={<h1>Expanded</h1>}
//                 expandOnRowClicked
//                 dense
//                 striped
//                 style={{width: '100%', height: '100%', overflow: 'scroll'}}
//             />
//         );
//     }
// };

export default Table;
