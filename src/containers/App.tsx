import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box'

import Table from 'components/table/Table';
import { timestamps } from 'utils/resource';
import { IResource, COLUMNS } from 'utils/constants';
import * as results from 'assets/resources.json';

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
      old => old.map((row, index) => {
        if (index === rowIndex) {
          const now = new Date();
          const edited = (field: string) => resource[field] !== row[field];
          const stamps = timestamps(resource, edited, now);
          return { ...row, ...resource, ...stamps, last_update: now };
        } else {
          return row;
        }
      })
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
