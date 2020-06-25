import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AddBoxIcon from '@material-ui/icons/AddBox';

import { ResourceDialog } from './ResourceDialog';
import { IResource } from 'utils/constants';

interface NewResourceProps {
  newResourceHandler: (resource: IResource) => void;
}

const NewResourceButton: React.FunctionComponent<NewResourceProps> =
    (props) => {
  const { newResourceHandler } = props;
  const [resource, setResource] = React.useState<IResource>({});
  const [isOpen, setOpen] = React.useState<boolean>(false);
  const handleClickOpen = () => setOpen(true);
  const submitHandler = (resource: IResource) => {
    newResourceHandler(resource);
    setResource({});
  };

  return (
    <div>
      <Tooltip title="New Resource">
        <IconButton aria-label="New Resource" onClick={handleClickOpen}>
          <AddBoxIcon />
        </IconButton>
      </Tooltip>
      <ResourceDialog
        title="New Resource"
        description="Add a resource to the community map."
        isOpen={isOpen}
        setOpen={setOpen}
        resource={resource}
        setResource={setResource}
        submitHandler={submitHandler}
      />
    </div>
  )
};

export default NewResourceButton;
