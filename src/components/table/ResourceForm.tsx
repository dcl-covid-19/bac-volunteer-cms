import React from 'react';
import { useFormContext } from 'react-hook-form';
import { DevTool } from "react-hook-form-devtools";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import {
  TextField,
  RadioGroup,
  CheckboxGroup,
  RequiredCheckbox,
} from './ResourceFormFields';
import { RESOURCE_CONDITION } from 'utils/constants';

const useStyles = makeStyles((theme: Theme) => createStyles({
  formGroup: {
    margin: theme.spacing(1),
  },
}));

interface ResourceFormProps { }

export const ResourceForm: React.FunctionComponent<ResourceFormProps> = 
    () => {
  const classes = useStyles();
  const { control, watch } = useFormContext();
  const resource = watch('resource');

  return (
    <>
      <DevTool control={control} />
      <TextField fullWidth required field="provider_name" />
      <RadioGroup required field="resource" />
      <CheckboxGroup required field="county" />
      {RESOURCE_CONDITION.payment.includes(resource) &&
          <RadioGroup required field="payment" />}
      {RESOURCE_CONDITION.accepts_medical.includes(resource) && (
        <div className={classes.formGroup}>
          <RequiredCheckbox field="accepts_medical" />
        </div>
      )}
      <TextField fullWidth field="address" />
      <div className={classes.formGroup}>
        <RequiredCheckbox field="bob" />
      </div>
    </>
  );
};

export default ResourceForm;
