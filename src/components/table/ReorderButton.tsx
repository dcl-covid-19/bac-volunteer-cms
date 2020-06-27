import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import ViewColumnRoundedIcon from '@material-ui/icons/ViewColumnRounded';

import { IListResult } from './ReorderList';
import ReorderForm from './ReorderForm';

interface ReorderButtonProps {
  lists: IListResult;
  setLists: React.Dispatch<React.SetStateAction<IListResult>>;
  onSubmit: () => void;
}

const ReorderButton: React.FunctionComponent<ReorderButtonProps> = (props) => {
  const { lists, setLists, onSubmit } = props;
  const [isOpen, setOpen] = React.useState<boolean>(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmit = () => {
    onSubmit();
    setOpen(false);
  };
  return (
    <>
      <Tooltip title="Add/Remove/Reorder Columns">
        <IconButton size="small" onClick={handleClickOpen}>
          <ViewColumnRoundedIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="dialog-title"
      >
        <DialogTitle id="dialog-title">Add/Remove/Reorder Columns</DialogTitle>
        <DialogContent>
          <ReorderForm lists={lists} setLists={setLists} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ReorderButton;
