import React from 'react';
import { TableToggleAllRowsSelectedProps } from 'react-table';
import Checkbox from '@material-ui/core/Checkbox';

interface ActionButtonsHeaderProps {
  getToggleAllRowsSelectedProps: (
    props?: Partial<TableToggleAllRowsSelectedProps>,
  ) => TableToggleAllRowsSelectedProps;
}

export const ActionButtonsHeader: React.FunctionComponent<ActionButtonsHeaderProps> =
    (props) => {
  const { getToggleAllRowsSelectedProps } = props;
  return (
    <Checkbox {...getToggleAllRowsSelectedProps()} color="primary" />
  );
};

export default ActionButtonsHeader;
