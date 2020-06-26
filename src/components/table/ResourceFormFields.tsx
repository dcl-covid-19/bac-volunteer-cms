import React from 'react';
import { useFormContext } from 'react-hook-form';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import MuiTextField from '@material-ui/core/TextField';

import { HEADERS, OPTIONS, CHECKBOX_GROUPS } from 'utils/constants';

const useStyles = makeStyles((theme: Theme) => createStyles({
  formControl: {
    margin: theme.spacing(1),
  },
}));

interface InputProps {
  field: string;
  fullWidth?: boolean;
  required?: boolean;
}

export const TextField: React.FunctionComponent<InputProps> = (props) => {
  const classes = useStyles();
  const { field, fullWidth, required } = props;
  const { register, errors } = useFormContext();

  return (
    <MuiTextField
      fullWidth={fullWidth}
      required={required}
      variant="filled"
      error={!!errors[field]}
      label={HEADERS[field]}
      name={field}
      inputRef={register({ required })}
      className={classes.formControl}
    />
  );
};

interface RadioProps extends Omit<InputProps, 'field'> {
  field: keyof typeof OPTIONS;
}

export const RadioGroup: React.FunctionComponent<RadioProps> = (props) => {
  const classes = useStyles();
  const { field, fullWidth, required } = props;
  const { register, errors } = useFormContext();

  return (
    <FormControl
      component="fieldset"
      fullWidth={fullWidth}
      required={required}
      error={!!errors[field]}
      className={classes.formControl}
    >
      <FormLabel component="legend">{HEADERS[field]}</FormLabel>
      {Object.keys(OPTIONS[field]).map(option => (
        <div>
          <input
            type="radio"
            id={option}
            key={option}
            name={field}
            value={option}
            ref={register({ required })}
          />
          <label htmlFor={option}>
            {(OPTIONS[field] as any)[option]}
          </label>
        </div>
      ))}
    </FormControl>
  );
};

interface CheckboxGroupProps extends Omit<InputProps, 'field'> {
  field: keyof typeof CHECKBOX_GROUPS;
}

export const CheckboxGroup: React.FunctionComponent<CheckboxGroupProps> =
    (props) => {
  const classes = useStyles();
  const { field, fullWidth, required } = props;
  const { register } = useFormContext();
  return (
    <FormControl
      component="fieldset"
      fullWidth={fullWidth}
      required={required}
      className={classes.formControl}
    >
      <FormLabel component="legend">
        {CHECKBOX_GROUPS[field].__header}
      </FormLabel>
      {
        Object.keys(CHECKBOX_GROUPS[field]).filter(
          option => option !== '__header'
        ).map(
          option => (
            <div>
              <input
                type="checkbox"
                id={option}
                key={option}
                name={option}
                ref={register}
              />
              <label htmlFor={option}>
                {(CHECKBOX_GROUPS[field] as any)[option]}
              </label>
            </div>
          )
        )
      }
    </FormControl>
  );
};

export const Checkbox: React.FunctionComponent<InputProps> = (props) => {
  const { field } = props;
  const { register } = useFormContext();

  return (
    <>
      <input type="checkbox" name={field} ref={register} />
      <label htmlFor={field}>{HEADERS[field]}</label>
    </>
  );
};
