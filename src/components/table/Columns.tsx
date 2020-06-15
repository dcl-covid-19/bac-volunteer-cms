import React from 'react';

import Checkbox from '@material-ui/core/Checkbox';
import { Row } from 'react-table';

import EditButton from './EditButton';

interface EditButtonCellProps {
    row: Row<Object>;
    updateRow: (rowIndex: number, value: any) => void;
};

export const actionsColumn = {
    id: 'selection',
    Header: ({ getToggleAllRowsSelectedProps } : { getToggleAllRowsSelectedProps: any }) => (
        <div>
            <Checkbox {...getToggleAllRowsSelectedProps()} color="primary" />
        </div>
    ),
    Cell: ({ row, updateRow } : EditButtonCellProps) => (
        <div style={{ display: "flex", flexDirection: "row" as "row" }}>
            <Checkbox {...row.getToggleRowSelectedProps()} color="primary" />
            <EditButton originalResource={row.original} updateRow={updateRow} rowIndex={row.index} />
        </div>
    ),
};

export const dataColumns = [
    { Header: "Last Updated", accessor: "last_update" },
    { Header: "Provider Name", accessor: "provider_name" },
    { Header: "Resource", accessor: "resource" },
    // { Header: "Region", accessor: "region" },
    { Header: "Address", accessor: "address" },
    // { Header: "ZIP", accessor: "zip" },
    // { Header: "Status", accessor: "status" },
    // { Header: "Free", accessor: "free" }
    { Header: "Black-Owned", accessor: "bob" },
    { Header: "Alameda", accessor: "alameda" },
    { Header: "Santa Clara", accessor: "santa_clara" },
    { Header: "San Mateo", accessor: "san_mateo" },
    { Header: "Contra Costa", accessor: "contra_costa" },
    { Header: "Marin", accessor: "marin" },
    { Header: "Monterey", accessor: "monterey" },
    { Header: "Sonoma", accessor: "sonoma" },
    { Header: "Solano", accessor: "solano" },
    { Header: "Napa", accessor: "napa" },
    { Header: "San Francisco", accessor: "san_francisco" },
];
