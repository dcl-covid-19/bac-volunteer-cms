import React from 'react';
import { useForm, FormContext } from 'react-hook-form';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';

import { ResourceDialog } from './ResourceDialog';
import { toForm, fromForm } from 'utils/resource';
import { IResource } from 'utils/constants';


interface EditButtonProps {
  originalResource: IResource;
  editHandler: (resource: IResource) => void;
};

const EditButton: React.FunctionComponent<EditButtonProps> = (props) => {
  const { originalResource, editHandler } = props;
  const [isOpen, setOpen] = React.useState<boolean>(false);
  const initialForm = toForm(originalResource);
  const methods = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: initialForm,
  });
  const handleClickOpen = () => {
    if (JSON.stringify(methods.getValues()) !==
        JSON.stringify(initialForm)) {
      methods.reset(initialForm);
    }
    setOpen(true);
  }
  const onSubmit = (resource: IResource) => {
    editHandler(fromForm(resource));
    setOpen(false);
  };

  return (
    <>
      <Tooltip title="Edit Resource">
        <IconButton aria-label="Edit Resource" onClick={handleClickOpen} size="small">
          <EditIcon />
        </IconButton>
      </Tooltip>
      <FormContext {...methods}>
        <ResourceDialog
          title="Edit Resource"
          isOpen={isOpen}
          setOpen={setOpen}
          onSubmit={onSubmit}
          successText="Successfully edited resource"
        />
      </FormContext>
    </>
  )
}

export default EditButton;
