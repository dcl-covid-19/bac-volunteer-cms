import React from 'react';

import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import { Row } from 'react-table';

const editHandler = () => console.log("clicked");

export const actionsColumn = {
    id: 'selection',
    Header: ({ getToggleAllRowsSelectedProps } : { getToggleAllRowsSelectedProps: any }) => (
        <div>
            <Checkbox {...getToggleAllRowsSelectedProps()} color="primary" />
        </div>
    ),
    Cell: ({ row } : { row: Row<Object> }) => (
        <div style={{ display: "flex", flexDirection: "row" as "row" }}>
            <Checkbox {...row.getToggleRowSelectedProps()} color="primary" />
            <Tooltip title="Edit">
                <IconButton aria-label="edit" onClick={editHandler}>
                    <EditIcon />
                </IconButton>
            </Tooltip>
        </div>
    ),
};

export const dataColumns = [
    { Header: "Provider Name", accessor: "provider_name" },
    { Header: "Resource", accessor: "resource" },
    // { Header: "Region", accessor: "region" },
    { Header: "Address", accessor: "address" },
    // { Header: "ZIP", accessor: "zip" },
    // { Header: "Status", accessor: "status" },
    // { Header: "Free", accessor: "free" }
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
    { Header: "Black-Owned", accessor: "bob" },
    { Header: "Last Updated", accessor: "last_update" },
];
