import React from 'react';
import { useFormContext } from 'react-hook-form';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

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
  flexColumn: {
    display: 'inline-flex',
    flexDirection: 'column',
  },
}));

interface ResourceFormProps { }

export const ResourceForm: React.FunctionComponent<ResourceFormProps> =
    () => {
  const classes = useStyles();
  const { watch } = useFormContext();
  const telehealth = watch('telehealth');

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <TextField fullWidth required field="provider_name" />
        </Grid>
        <Grid item xs={6}>
          <TextField fullWidth required field="provider_addloc" />
        </Grid>
      </Grid>
      <RadioGroup required field="resource" />
      <CheckboxGroup required field="county" />
      <CheckboxGroup required field="eligibility" />
      <div className={classes.flexColumn}>
        <RadioGroup required field="payment" />
        <Checkbox required field="in_person" />
        <Checkbox required field="telehealth" />
      </div>
      <CheckboxGroup required field="legal_areas_served" />
      <div className={classes.flexColumn}>
        <CheckboxGroup required field="medical_services" />
        <Checkbox required field="accepts_medical" />
      </div>
      <div className={classes.flexColumn}>
        <Checkbox required field="snap" />
        <Checkbox required field="wic" />
        <Checkbox required field="ebt_online" />
        <Checkbox required field="ebt_phone" />
        <Checkbox field="must_preorder" />
        <Checkbox field="pay_at_pickup" />
        <Checkbox field="in_store_pickup" />
        <Checkbox field="curbside_pickup" />
        <Checkbox field="drive_thru" />
        <Checkbox field="delivery" />
        <Checkbox field="farm_pickup" />
        <Checkbox field="farmers_market" />
      </div>
      <Grid container spacing={1}>
        <Grid item xs={5}>
          <TextField required={!telehealth} fullWidth field="address" />
        </Grid>
        <Grid item xs={4}>
          <TextField fullWidth field="city" />
        </Grid>
        <Grid item xs={1}>
          <TextField fullWidth field="state" />
        </Grid>
        <Grid item xs={2}>
          <TextField fullWidth field="zip" type="number" />
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <TextField fullWidth field="contact" type="tel" required />
        </Grid>
        <Grid item xs={8}>
          <TextField fullWidth field="email" type="email" />
        </Grid>
      </Grid>
      <div className={classes.formGroup}>
        <Checkbox required field="call_in_advance" />
        <Checkbox field="special_hours" />
        <Checkbox field="bob" />
      </div>
      <TextField required fullWidth multiline rowsMax={10} field="notes" />
      <TextField fullWidth multiline rowsMax={10} field="notes_es" />
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <TextField fullWidth field="web_link" />
        </Grid>
        <Grid item xs={6}>
          <TextField fullWidth field="web_link_es" />
        </Grid>
      </Grid>
    </>
  );
};

export default ResourceForm;
