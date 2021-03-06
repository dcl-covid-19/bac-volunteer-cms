import React from 'react';
import clsx from 'clsx';
import { Controller, useFormContext } from 'react-hook-form';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import MuiTextField from '@material-ui/core/TextField';

import { shouldOmit } from 'utils/resource';
import { FORM_FIELDS, OPTIONS, CHECKBOX_GROUPS } from 'utils/constants';

const useStyles = makeStyles((theme: Theme) => createStyles({
  formControl: {
    margin: theme.spacing(1),
  },
  checkboxLabel: {
    marginRight: theme.spacing(1),
  },
  checkboxError: {
    color: theme.palette.error.main,
  },
}));

interface InputProps {
  field: string;
  fullWidth?: boolean;
  required?: boolean;
}

interface TextProps extends InputProps {
  type?: string;
  multiline?: boolean;
  rowsMax?: number;
}

export const TextField: React.FunctionComponent<TextProps> = React.memo(
    (props) => {
  const { field, required, ...rest } = props;
  const { register, errors, watch } = useFormContext();
  if (shouldOmit(watch('resource'), field)) {
    return null;
  };
  const classes = useStyles();

  return (
    <MuiTextField
      {...rest}
      required={required}
      variant="filled"
      error={!!errors[field]}
      label={FORM_FIELDS[field]}
      name={field}
      inputRef={register({ required })}
      className={classes.formControl}
    />
  );
});

export const RadioGroup: React.FunctionComponent<InputProps> = React.memo(
    (props) => {
  const { field, fullWidth, required } = props;
  const { register, errors, watch } = useFormContext();
  if (shouldOmit(watch('resource'), field)) {
    return null;
  };
  const classes = useStyles();

  return (
    <FormControl
      component="fieldset"
      fullWidth={fullWidth}
      required={required}
      error={!!errors[field]}
      className={classes.formControl}
    >
      <FormLabel component="legend">{FORM_FIELDS[field]}</FormLabel>
      {Object.keys(OPTIONS[field]).map(option => (
        <div key={option}>
          <input
            type="radio"
            id={option}
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
});

interface CheckboxGroupProps extends Omit<InputProps, 'field'> {
  field: keyof typeof CHECKBOX_GROUPS;
}

export const CheckboxGroup: React.FunctionComponent<CheckboxGroupProps> =
    React.memo((props) => {
  const { field, fullWidth, required } = props;
  const {
    register,
    errors,
    setValue,
    triggerValidation,
    watch
  } = useFormContext();
  if (shouldOmit(watch('resource'), field)) {
    return null;
  };
  const classes = useStyles();
  const setAll = React.useCallback(() => {
    setValue(field, Object.keys(CHECKBOX_GROUPS[field]));
    triggerValidation(field);
  }, [setValue, triggerValidation, field]);
  const setNone = React.useCallback(() => {
    setValue(field, []);
    triggerValidation(field);
  }, [setValue, triggerValidation, field]);
  return (
    <FormControl
      component="fieldset"
      fullWidth={fullWidth}
      required={required}
      error={!!errors[field]}
      className={classes.formControl}
    >
      <FormLabel component="legend">
        {CHECKBOX_GROUPS[field].__header}
      </FormLabel>
      <div style={{ display: 'flex' }}>
        <button onClick={setAll}>All</button>
        <button onClick={setNone}>None</button>
      </div>
      {
        Object.keys(CHECKBOX_GROUPS[field]).filter(
          option => option !== '__header'
        ).map(
          (option) => (
            <div key={option}>
              <input
                type="checkbox"
                id={option}
                value={option}
                name={field}
                ref={register({ required })}
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
});

const CHECKBOX_RULES = Object.freeze({ validate: (x: any) => x != null });
export const Checkbox: React.FunctionComponent<InputProps> = React.memo(
    (props) => {
  const { field, required } = props;
  const { control, errors, watch } = useFormContext();
  if (shouldOmit(watch('resource'), field)) {
    return null;
  };
  const classes = useStyles();
  const [checked, setChecked] = React.useState<boolean>(
    !!control.defaultValuesRef.current[field]
  );
  const [indeterminate, setIndeterminate] = React.useState<boolean>(
    control.defaultValuesRef.current[field] == null
  );
  const onChange = React.useCallback(
    ([event]: React.ChangeEvent<HTMLInputElement>[]) => {
      const checked = !indeterminate && event.target.checked;
      setChecked(checked);
      setIndeterminate(false);
      return checked;
    },
    [indeterminate, setChecked, setIndeterminate],
  );
  const inputRef = React.useCallback(input => {
    if (input) {
      input.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <>
      <span
        className={clsx(classes.checkboxLabel, {
          [classes.checkboxError]: errors[field],
        })}
      >
        <Controller
          as={
            <input
              ref={inputRef}
              checked={checked}
              id={field}
              type="checkbox"
            />
          }
          name={field}
          control={control}
          onChange={onChange}
          rules={required ? CHECKBOX_RULES : undefined}
        />
        <label htmlFor={field}>
          {FORM_FIELDS[field]}
          {required ? ' *' : ''}
        </label>
      </span>
    </>
  );
});
