import { IResource, OPTIONS, VALIDATORS } from 'utils/constants';

export type IErrors = any;

const counties = Object.keys(OPTIONS.county);

export const allFieldsEqualBool =
    (resource: IResource, fields: string[], value: boolean) => fields.reduce(
  (acc: boolean, field: string) => (acc && (!!resource[field] === value)),
  true
);

export const setAllFields = (
  resource: IResource,
  setResource: (resource: IResource) => void,
  fields: string[],
  value: any
) => {
  const newValues = fields.reduce(
    (acc: object, field: string) => ({...acc, [field]: value}), {}
  );
  setResource({ ...resource, ...newValues });
};

export const getResourceErrors = (resource: IResource) => {
  var errors: IErrors = {};
  for (const field in VALIDATORS) {
    if (VALIDATORS.hasOwnProperty(field) &&
        !VALIDATORS[field](resource[field])) {
      errors[field] = 'invalid';
    }
  }
  if (allFieldsEqualBool(resource, counties, false)) {
    errors.counties = 'At least one county must be served';
  }
  return errors;
};
