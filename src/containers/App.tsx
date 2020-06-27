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

interface AppProps { }

const App: React.FunctionComponent<AppProps> = () => {
  const classes = useStyles();
  const [data, setData] = React.useState<IResource[]>(results.rows);
  const skipPageResetRef = React.useRef<boolean>();
  const updateRow = (rowIndex: number, resource: IResource) => {
    skipPageResetRef.current = true;
    setData(
      old => old.map((row, index) => (
        index === rowIndex ?
          { ...row, ...resource, last_update: new Date() } :
          row
      ))
    );
  };

  return (
    <Box className={classes.root}>
      <Table
        data={data}
        setData={setData}
        columns={COLUMNS}
        updateRow={updateRow}
        skipPageResetRef={skipPageResetRef}
      />
    </Box>
  );;
}

export default App;
