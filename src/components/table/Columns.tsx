import React from 'react';

import { Row } from 'react-table';

import CompactCheckbox from 'components/common/CompactCheckbox';

export const selectColumn = {
    id: 'selection',
    Header: ({ getToggleAllRowsSelectedProps } : { getToggleAllRowsSelectedProps: any }) => (
        <div>
            <CompactCheckbox {...getToggleAllRowsSelectedProps()} />
        </div>
    ),
    Cell: ({ row } : { row: Row<Object> }) => (
        <div>
            <CompactCheckbox {...row.getToggleRowSelectedProps()} />
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
