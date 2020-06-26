import React from 'react';
import { useFormContext } from 'react-hook-form';
import { DevTool } from "react-hook-form-devtools";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import {
  TextField,
  RadioGroup,
  CheckboxGroup,
  Checkbox,
} from './ResourceFormFields';

const useStyles = makeStyles((theme: Theme) => createStyles({
  formGroup: {
    margin: theme.spacing(1),
  },
}));

interface ResourceFormProps { }

export const ResourceForm: React.FunctionComponent<ResourceFormProps> =
    (props) => {
  const classes = useStyles();
  const { control } = useFormContext();

  return (
    <>
      <DevTool control={control} />
      <TextField fullWidth required field="provider_name" />
      <RadioGroup required field="resource" />
      <CheckboxGroup required field="county" />
      <TextField fullWidth field="address" />
      <div className={classes.formGroup}>
        <Checkbox field="bob" />
      </div>
    </>
  );
};

export default ResourceForm;
