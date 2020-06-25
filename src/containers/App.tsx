import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box'

import Table from 'components/table/Table';
import { IResource, COLUMNS } from 'utils/constants';
import * as results from 'assets/meals.json';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column" as "column",
  },
}));

function App() {
  const classes = useStyles();
  const [data, setData] = React.useState(results.rows);
  const columns = React.useMemo(() => COLUMNS, []);
  const updateRow = (rowIndex: number, resource: IResource) => setData(
    old => old.map((row, index) => (index === rowIndex ? resource : row))
  );

  return (
    <Box className={classes.root}>
      <Table
        data={data}
        setData={setData}
        columns={columns}
        updateRow={updateRow}
      />
    </Box>
  );;
}

export default App;
