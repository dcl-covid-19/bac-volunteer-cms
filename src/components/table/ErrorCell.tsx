import React from 'react';

import { Column } from 'react-table';

import { fieldErrors } from 'util/Resource';

interface ErrorCellProps {
    value: any;
    column: Column<Object>;
};

const ErrorCell = (props: ErrorCellProps) => {
    const { value, column } = props;
    const hasErrors = column.id && fieldErrors[column.id!] && fieldErrors[column.id!](value);

    return hasErrors ? <div style={{ 'backgroundColor': '#ffe2ec' }}>{value}</div> : (value || null);
};

export default ErrorCell;
