import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

import { allFieldsEqualBool } from 'utils/resource';
import { IResource, OPTIONS } from 'utils/constants';

const useStyles = makeStyles((theme: Theme) => createStyles({
  formControl: {
    margin: theme.spacing(1),
  },
}));

interface IInputProps {
  resource: IResource;
  field: string;
  description: string;
  handleChange: (
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => void
  );
  error?: boolean;
  fullWidth?: boolean;
  required?: boolean;
}

export const TextInput: React.FunctionComponent<IInputProps> =
    (props) => {
  const classes = useStyles();
  const { resource, field, description, handleChange, ...formControlProps } =
      props;
  return (
    <FormControl
      variant="outlined"
      className={classes.formControl}
      {...formControlProps}
    >
      <InputLabel htmlFor={field}>{description}</InputLabel>
      <OutlinedInput
        id={field}
        value={resource[field] || ''}
        onChange={handleChange(field)}
        label={description}
      />
    </FormControl>
  );
};

interface IRadioProps extends Omit<IInputProps, 'field'> {
  field: keyof typeof OPTIONS;
}

export const RadioInput: React.FunctionComponent<IRadioProps> =
    (props) => {
  const classes = useStyles();
  const { resource, field, description, handleChange, ...formControlProps } =
      props;
  const options = Object.keys(OPTIONS[field]).map(option => (
    <FormControlLabel
      value={option}
      control={<Radio color="primary" />}
      label={(OPTIONS[field] as any)[option]}
      key={option}
    />
  ));
  return (
    <FormControl
      component="fieldset"
      className={classes.formControl}
      {...formControlProps}
    >
      <FormLabel component="legend">{description}</FormLabel>
      <RadioGroup
        aria-label={field}
        name={field}
        value={resource[field] || ''}
        onChange={handleChange(field)}
      >
        {options}
      </RadioGroup>
    </FormControl>
  );
};

interface ICheckboxesInputProps extends Omit<IInputProps, 'field'> {
  field: keyof typeof OPTIONS;
  checkAll: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CheckboxesInput: React.FunctionComponent<ICheckboxesInputProps> =
    (props) => {
  const classes = useStyles();
  const {
    resource,
    field,
    description,
    handleChange,
    checkAll,
    ...formControlProps
  } = props;
  const keys = Object.keys((OPTIONS as any)[field]);
  const checkboxes = keys.map(key => (
    <FormControlLabel
      control={
        <Checkbox
          color="primary"
          checked={!!resource[key]}
          onChange={handleChange(key)}
        />
      }
      label={(OPTIONS as any)[field][key]}
      key={key}
    />
  ));
  return (
    <FormControl
      {...formControlProps}
      component="fieldset"
      className={classes.formControl}
    >
      <FormLabel component="legend">{description}</FormLabel>
      <FormGroup row>
        {checkboxes}
      </FormGroup>
      <FormControlLabel
        control={(
          <Checkbox
            color="primary"
            checked={allFieldsEqualBool(resource, keys, true)}
            indeterminate={
              !allFieldsEqualBool(resource, keys, true) &&
              !allFieldsEqualBool(resource, keys, false)
            }
            onChange={checkAll}
          />
        )}
        label="All"
      />
    </FormControl>
  );
};

export const CheckboxInput: React.FunctionComponent<IInputProps> =
    (props) => {
  const classes = useStyles();
  const { resource, field, description, handleChange, ...formControlProps } =
      props;
  return (
    <FormControl {...formControlProps} className={classes.formControl}>
      <FormControlLabel
        control={
          <Checkbox
            color="primary"
            checked={!!resource[field]}
            onChange={handleChange(field)}
          />
        }
        label={description}
      />
    </FormControl>
  );
};
