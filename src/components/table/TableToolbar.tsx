import React from 'react';

import clsx from 'clsx';
import { createStyles, lighten, makeStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';

import NewResource from './NewResource';
import Search from './Search';

const useToolbarStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(1),
        },
        highlight:
            theme.palette.type === 'light'
                ? {
                    color: theme.palette.secondary.main,
                    backgroundColor: lighten(theme.palette.secondary.light, 0.85),
                  }
                : {
                    color: theme.palette.text.primary,
                    backgroundColor: theme.palette.secondary.dark,
                  },
        title: {
            flex: '1 1 100%',
        },
    }),
);

interface TableToolbarProps {
    numSelected: number;
    globalFilter: any;
    setGlobalFilter: (filterValue: any) => void;
    newResourceHandler: (resource: any) => void;
    deleteHandler: (event: React.MouseEvent<HTMLElement>) => void;
}

const TableToolbar = (props: TableToolbarProps) => {
    const classes = useToolbarStyles();
    const { numSelected, globalFilter, setGlobalFilter, newResourceHandler, deleteHandler } = props;
    const selected = numSelected > 0;
    const onSearchChange = (value: string) => setGlobalFilter(value);

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: selected,
            })}
        >
            {selected ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                    Drafts
                </Typography>
            )}
            {selected ? (
                <Tooltip title="Delete">
                    <IconButton aria-label="delete" onClick={deleteHandler}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <>
                    <Search onSearchChange={onSearchChange} globalFilter={globalFilter}/>
                    <NewResource newResourceHandler={newResourceHandler}/>
                </>
            )}
        </Toolbar>
    );
};

export default TableToolbar;
