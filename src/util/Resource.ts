import * as options from 'constants/Options.json';

const countyNames = options.county;
const counties = Object.keys(countyNames);
const resourceTypes: any = options.resource;

export const coerceToOptions = (value: string, options: string[]) => (options.includes(value) ? value: "");
export const allFieldsEqualBool = (resource: any, fields: any[], value: boolean) => fields.reduce(
    (accumulator: boolean, field: any) => (accumulator && (!resource[field] !== value)),
    true
);
export const setAllFields = (resource: any, setResource: (resource: any) => void, fields: any[], value: any) => {
    const newValues = fields.reduce((acc: any, field: any) => ({...acc, [field]: value}), {});
    setResource({ ...resource, ...newValues });
};

export const fieldErrors: any = Object.freeze({
    'provider_name': (name: string) => !name,
    'resource': (resource: string) => !resourceTypes[resource],
});

export const getResourceErrors = (resource: any) => {
    var errors: any = {};
    for (const field in fieldErrors) {
        if (fieldErrors.hasOwnProperty(field) && fieldErrors[field](resource[field])) {
            errors[field] = 'invalid';
        }
    }
    if (allFieldsEqualBool(resource, counties, false)) {
        errors.counties = 'At least one county must be served';
    }
    return errors;
};
