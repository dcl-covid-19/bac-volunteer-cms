import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import ResourceForm from './ResourceForm';
import { getResourceErrors } from 'util/Resource';

interface AddEditDialogProps {
    title: string;
    description: string;
    isOpen: boolean;
    setOpen: (isOpen: boolean) => void;
    resource: any;
    setResource: (resource: any) => void;
    submitHandler: (resource: any) => void;
};

export const AddEditDialog = (props: AddEditDialogProps) => {
    const { title, description, isOpen, setOpen, resource, setResource, submitHandler } = props;
    const errors = getResourceErrors(resource);
    const hasErrors = () => {
        for (var prop in errors) {
            return true;
        }
        return false;
    }

    const handleClose = () => setOpen(false);
    const handleSubmit = (event: React.MouseEvent<HTMLElement>) => {
        if (!hasErrors()) {
            submitHandler(resource);
            setResource({} as any);
            handleClose();
        }
    }

    return (
        <div>
            <Dialog
                maxWidth="lg"
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="dialog-title"
            >
                <DialogTitle id="dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{description}</DialogContentText>
                    <ResourceForm resource={resource} setResource={setResource} errors={errors}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} variant="contained" color="primary" disabled={hasErrors()}>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default AddEditDialog;
