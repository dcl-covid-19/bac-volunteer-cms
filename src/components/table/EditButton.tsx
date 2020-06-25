import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';

import { ResourceDialog } from './ResourceDialog';
import { IResource } from 'utils/constants';


interface EditButtonProps {
  originalResource: IResource;
  editHandler: (resource: IResource) => void;
};

const EditButton: React.FunctionComponent<EditButtonProps> = (props) => {
  const { originalResource, editHandler } = props;
  const [resource, setResource] = React.useState<IResource>(originalResource);
  const [isOpen, setOpen] = React.useState<boolean>(false);
  const handleClickOpen = () => {
    if (JSON.stringify(resource) !== JSON.stringify(originalResource)) {
      setResource(originalResource);
    }
    setOpen(true);
  }

  return (
    <div>
      <Tooltip title="Edit Resource">
        <IconButton aria-label="Edit Resource" onClick={handleClickOpen}>
          <EditIcon />
        </IconButton>
      </Tooltip>
      <ResourceDialog
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
