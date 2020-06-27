import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import ViewColumnRoundedIcon from '@material-ui/icons/ViewColumnRounded';

import { IListResult } from './ReorderList';
import ReorderForm from './ReorderForm';

interface ReorderButtonProps {
  lists: IListResult;
  setLists: React.Dispatch<React.SetStateAction<IListResult>>;
}

const ReorderButton: React.FunctionComponent<ReorderButtonProps> = (props) => {
  const { lists, setLists } = props;
  const [isOpen, setOpen] = React.useState<boolean>(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Tooltip title="Reorder Columns">
        <IconButton size="small" onClick={handleClickOpen}>
          <ViewColumnRoundedIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="dialog-title"
      >
        <DialogTitle id="dialog-title">Reorder Columns</DialogTitle>
        <DialogContent>
          <DialogContentText>Click and drag to reorder.</DialogContentText>
          <ReorderForm lists={lists} setLists={setLists} />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose} color="default">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ReorderButton;
