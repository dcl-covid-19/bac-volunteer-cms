import React from 'react';
import { useForm, FormContext } from 'react-hook-form';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AddBoxIcon from '@material-ui/icons/AddBox';

import { ResourceDialog } from './ResourceDialog';
import { fromBoolean } from 'utils/resource';
import { IResource } from 'utils/constants';

interface NewResourceProps {
  newResourceHandler: (resource: IResource) => void;
}

const NewResourceButton: React.FunctionComponent<NewResourceProps> =
    (props) => {
  const { newResourceHandler } = props;
  const [isOpen, setOpen] = React.useState<boolean>(false);
  const methods = useForm<IResource>({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });
  const handleClickOpen = () => setOpen(true);
  const onSubmit = (resource: IResource) => {
    newResourceHandler(fromBoolean(resource));
    setOpen(false);
  };

  return (
    <div>
      <Tooltip title="New Resource">
        <IconButton aria-label="New Resource" onClick={handleClickOpen}>
          <AddBoxIcon />
        </IconButton>
      </Tooltip>
      <FormContext {...methods}>
        <ResourceDialog
          title="New Resource"
          description="Add a resource to the community map."
          isOpen={isOpen}
          setOpen={setOpen}
          onSubmit={onSubmit}
          successText="Successfully added resource"
        />
      </FormContext>
    </div>
  )
};

export default NewResourceButton;
