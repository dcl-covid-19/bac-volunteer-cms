import React from 'react';

import Checkbox from '@material-ui/core/Checkbox'
import { Row } from 'react-table';

export const selectColumn = {
    id: 'selection',
    Header: ({ getToggleAllRowsSelectedProps } : { getToggleAllRowsSelectedProps: any }) => (
        <div>
            <Checkbox {...getToggleAllRowsSelectedProps()} />
        </div>
    ),
    Cell: ({ row } : { row: Row<Object> }) => (
        <div>
            <Checkbox {...row.getToggleRowSelectedProps()} />
        </div>
    ),
};

export const dataColumns = [
    { Header: "Provider Name", accessor: "provider_name" },
    { Header: "Resource", accessor: "resource" },
    { Header: "Region", accessor: "region" },
    { Header: "Address", accessor: "address" },
    { Header: "ZIP", accessor: "zip" },
    { Header: "Status", accessor: "status" },
    { Header: "Free", accessor: "free" }
];

export default dataColumns;
