import React from 'react';
import { useFormContext } from 'react-hook-form';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Toast from 'components/common/Toast';
import ResourceForm from './ResourceForm';
import { IResource, HEADERS } from 'utils/constants';

interface ResourceDialogProps {
  title: string;
  description?: string;
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
  onSubmit: (resource: IResource) => void;
  successText: string;
};

const truncate = (str: string, n: number, useWordBoundary: boolean) => {
  if (str.length <= n) { return str; }
  const subString = str.substr(0, n-1);
  return (useWordBoundary
    ? subString.substr(0, subString.lastIndexOf(" ")) 
    : subString) + "...";
};

export const ResourceDialog: React.FunctionComponent<ResourceDialogProps> =
    (props) => {
  const { title, description, isOpen, setOpen, onSubmit, successText } = props;
  const [ errorOpen, setErrorOpen ] = React.useState<boolean>(false);
  const [ errorText, setErrorText ] = React.useState<string>("");
  const [ successOpen, setSuccessOpen ] = React.useState<boolean>(false);
  const handleClose = () => setOpen(false);
  const { handleSubmit, errors, formState } = useFormContext();
  React.useEffect(() => {
    const errorFields = Object.keys(errors);
    if (errorFields.length !== 0) {
      setErrorText(truncate(`Missing required fields: ${
        errorFields.map(
          error => HEADERS.hasOwnProperty(error) ? HEADERS[error] : error
        ).join(', ')
      }`, 75, true));
      setErrorOpen(true);
      setSuccessOpen(false);
    } else if (formState.submitCount > 0) {
      setSuccessOpen(true);
      setErrorOpen(false);
    }
  // eslint-disable-next-line
  }, [formState.submitCount])

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
          <ResourceForm />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit(onSubmit)}
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <Toast
        open={errorOpen}
        setOpen={setErrorOpen}
        severity="error"
        text={errorText}
      />
      <Toast
        open={successOpen}
        setOpen={setSuccessOpen}
        severity="success"
        text={successText}
      />
    </div>
  )
}

export default ResourceDialog;
