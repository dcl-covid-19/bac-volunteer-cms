import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useForm, FormContext } from 'react-hook-form';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';

import { ResourceDialog } from './ResourceDialog';
import { fromForm } from 'utils/resource';
import { IResource } from 'utils/constants';

const useStyles = makeStyles((theme: Theme) => createStyles({
  button: {
    textTransform: "none",
    margin: theme.spacing(1),
  },
}));

interface NewResourceProps {
  newResourceHandler: (resource: IResource) => void;
}

const NewResourceButton: React.FunctionComponent<NewResourceProps> =
    (props) => {
  const classes = useStyles();
  const { newResourceHandler } = props;
  const [isOpen, setOpen] = React.useState<boolean>(false);
  const methods = useForm<IResource>({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });
  const handleClickOpen = () => setOpen(true);
  const onSubmit = (resource: IResource) => {
    newResourceHandler(fromForm(resource));
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        className={classes.button}
        onClick={handleClickOpen}
      >
        <Typography noWrap>New Resource</Typography>
      </Button>
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
