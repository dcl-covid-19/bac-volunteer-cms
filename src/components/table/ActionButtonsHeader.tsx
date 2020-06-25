import React from 'react';
import { TableToggleAllRowsSelectedProps } from 'react-table';
import Checkbox from '@material-ui/core/Checkbox';

interface ActionButtonsHeaderProps {
  getToggleAllRowsSelectedProps: (
    props?: Partial<TableToggleAllRowsSelectedProps>,
  ) => TableToggleAllRowsSelectedProps;
}

const ActionButtonsHeader: React.FunctionComponent<ActionButtonsHeaderProps> =
    (props) => {
  const { getToggleAllRowsSelectedProps } = props;
  return (
    <div>
      <Checkbox {...getToggleAllRowsSelectedProps()} color="primary" />
    </div>
  );
};

export default ActionButtonsHeader;
