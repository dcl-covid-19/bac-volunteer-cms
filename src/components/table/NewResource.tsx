import React, { useState } from 'react'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import PropTypes from 'prop-types'
import Switch from '@material-ui/core/Switch'
import TextField from '@material-ui/core/TextField'
import Tooltip from '@material-ui/core/Tooltip'
import AddBoxIcon from '@material-ui/icons/AddBox'

import * as results from 'constants/grocery.json';

const initialResource = results.rows[0] || { "provider_name": "Lawrence" }

interface NewResourceProps {
    newResourceHandler: (resource: any) => void,
};

const NewResource = props => {
    const { newResourceHandler } = props;
    const [resource, setResource] = useState(initialResource)
    const [isOpen, setOpen] = React.useState(false);

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleAdd = (event: React.MouseEvent<HTMLElement>) => {
        newResourceHandler(resource);
        setResource(initialResource);
    }
    const handleChange = (field: string) => (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setResource({ ...resource, [field]: event.target.value });
    }
    const makeTextField = (label: string, field: string, autofocus = false) => {
        return (
            <TextField
                autofocus={autofocus}
                margin="dense"
                label={label}
                type="text"
                fullWidth
                value={resource[field]}
                onChange={handleChange
            />
        );
    }

    return (
        <div>
            <Tooltip title="New Resource">
                <IconButton aria-label="New Resource" onClick={handleClickOpen}>
                    <AddBoxIcon />
                </IconButton>
            </Tooltip>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="new-user-dialog-title"
            >
                <DialogTitle id="new-user-dialog-title">New Resource</DialogTitle>
                <DialogContent>
                    <DialogContentText>Add a resource to the community map.</DialogContentText>
                    {makeTextField("Provider Name", "provider_name", true)}
                    {makeTextField("Address", "address")}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleAdd} variant="contained" color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default NewResource;
