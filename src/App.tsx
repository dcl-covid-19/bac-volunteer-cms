import React from 'react';

import Box from '@material-ui/core/Box'
import { Column } from 'react-table';

import Table from 'components/table/Table';
import { dataColumns } from 'components/table/Columns';
import * as results from 'constants/Meals.json';

function App() {
    const [data, setData] = React.useState(results.rows);
    const columns = React.useMemo(() => dataColumns as Column<Object>[], []);
    const appStyle = {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column" as "column",
    };
    return (
        <Box style={appStyle}>
            <Table
                data={data}
                setData={setData}
                columns={columns}
            />
        </Box>
    );;
}

export default App;
