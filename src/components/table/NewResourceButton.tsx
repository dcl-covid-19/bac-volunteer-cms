import React, { useState } from 'react';

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AddBoxIcon from '@material-ui/icons/AddBox';

import { AddEditDialog } from './AddEditDialog';

const initialResource: any = {"resource": "invalid"};

interface NewResourceProps {
    newResourceHandler: (resource: any) => void;
};

const NewResourceButton = (props: NewResourceProps) => {
    const { newResourceHandler } = props;
    const [resource, setResource] = useState(initialResource);
    const [isOpen, setOpen] = React.useState(false);
    const handleClickOpen = () => setOpen(true);

    return (
        <div>
            <Tooltip title="New Resource">
                <IconButton aria-label="New Resource" onClick={handleClickOpen}>
                    <AddBoxIcon />
                </IconButton>
            </Tooltip>
            <AddEditDialog
                title="New Resource"
                description="Add a resource to the community map."
                isOpen={isOpen}
                setOpen={setOpen}
                resource={resource}
                setResource={setResource}
                submitHandler={newResourceHandler}
            />
        </div>
    )
}

export default NewResourceButton;
