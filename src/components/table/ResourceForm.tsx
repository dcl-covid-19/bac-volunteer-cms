import React from 'react';

import {
  TextInput,
  RadioInput,
  CheckboxesInput,
  CheckboxInput
} from 'components/table/ResourceFormFields';
import { IErrors, setAllFields } from 'utils/resource';
import { IResource, OPTIONS } from 'utils/constants';

interface ResourceFormProps {
  resource: IResource;
  setResource: (resource: IResource) => void;
  errors: IErrors;
};

export const ResourceForm = function(props: ResourceFormProps) {
  const { resource, setResource, errors } = props;

  const handleChange =
      (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setResource({ ...resource, [field]: event.target.value });
  };
  const handleChecked =
      (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setResource({ ...resource, [field]: event.target.checked ? 1 : 0 });
  };
  const checkAllCounties =
      (event: React.ChangeEvent<HTMLInputElement>) => setAllFields(
    resource,
    setResource,
    Object.keys(OPTIONS.county),
    event.target.checked ? 1 : 0
  );

  const inputProps = { resource, handleChange };
  const checkboxProps = { resource, handleChange: handleChecked };

  return (
    <>
      <TextInput
        {...inputProps}
        required
        fullWidth
        error={!!errors.provider_name}
        field="provider_name"
        description="Provider Name"
      />
      <RadioInput
        {...inputProps}
        required
        fullWidth
        error={!!errors.resource}
        field="resource"
        description="Resource Type"
      />
      <CheckboxesInput
        {...checkboxProps}
        required
        fullWidth
        error={!!errors.counties}
        field="county"
        description="Counties Served"
        checkAll={checkAllCounties}
      />
      <TextInput
        {...inputProps}
        fullWidth
        field="address"
        description="Address"
      />
      <CheckboxInput
        {...checkboxProps}
        field="bob"
        description="Black-Owned"
      />
    </>
  );
}

export default ResourceForm;
