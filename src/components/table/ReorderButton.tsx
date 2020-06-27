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
import { HEADERS } from 'utils/constants';

interface ReorderButtonProps {
  setColumnOrder: (updater: any) => void;
  setHiddenColumns: (updater: any) => void;
  skipPageResetRef: React.MutableRefObject<boolean | undefined>;
  columnOrder: string[];
}

const ReorderButton: React.FunctionComponent<ReorderButtonProps> = (props) => {
  const {
    columnOrder,
    setColumnOrder,
    setHiddenColumns,
    skipPageResetRef
  } = props;
  const [isOpen, setOpen] = React.useState<boolean>(false);
  const [lists, setLists] = React.useState<IListResult>({
    shown: [],
    hidden: [],
  });
  React.useEffect(() => {
    const [, ...realColumns] = columnOrder;
    setLists({
      shown: realColumns,
      hidden: Object.keys(HEADERS).filter(key => !columnOrder.includes(key)),
    });
  }, [columnOrder])
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmit = () => {
    skipPageResetRef.current = true;
    setColumnOrder(['actions', ...lists.shown]);
    setHiddenColumns(lists.hidden);
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
