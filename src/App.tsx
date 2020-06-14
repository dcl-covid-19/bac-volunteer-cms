import React from 'react';

import Box from '@material-ui/core/Box'

import Table from 'components/table/Table';

function App() {
    const appStyle = {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column" as "column",
    };
    return <Box style={appStyle}><Table/></Box>;
}

export default App;
