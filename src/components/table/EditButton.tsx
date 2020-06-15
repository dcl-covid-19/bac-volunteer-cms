import React, { useState } from 'react';

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';

import { AddEditDialog } from './AddEditDialog';


interface EditButtonProps {
    originalResource: any;
    updateRow: (rowIndex: number, value: any) => void;
    rowIndex: number;
};

const EditButton = (props: EditButtonProps) => {
    const { originalResource, updateRow, rowIndex } = props;
    const [resource, setResource] = useState(originalResource);
    const [isOpen, setOpen] = React.useState(false);
    const handleClickOpen = () => setOpen(true);
    const editHandler = (resource: any) => updateRow(rowIndex, resource);

    return (
        <div>
            <Tooltip title="Edit Resource">
                <IconButton aria-label="Edit Resource" onClick={handleClickOpen}>
                    <EditIcon />
                </IconButton>
            </Tooltip>
            <AddEditDialog
                title="Edit Resource"
                description="Editing an existing resource or draft of resource."
                isOpen={isOpen}
                setOpen={setOpen}
                resource={resource}
                setResource={setResource}
                submitHandler={editHandler}
            />
        </div>
    )
}

export default EditButton;
