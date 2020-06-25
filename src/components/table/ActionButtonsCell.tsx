import React from 'react';
import { Row } from 'react-table';
import Checkbox from '@material-ui/core/Checkbox';

import EditButton from './EditButton';
import { IResource } from 'utils/constants';

interface ActionButtonsCellProps {
  row: Row<Object>;
  updateRow: (rowIndex: number, resource: IResource) => void;
}

const ActionButtonsCell: React.FunctionComponent<ActionButtonsCellProps> =
    (props) => {
  const { row, updateRow } = props;
  const editHandler = (resource: IResource) => updateRow(row.index, resource);
  return (
    <div style={{ display: "flex", flexDirection: "row" as "row" }}>
      <Checkbox {...row.getToggleRowSelectedProps()} color="primary" />
      <EditButton originalResource={row.original} editHandler={editHandler} />
    </div>
  );
};

export default ActionButtonsCell;
