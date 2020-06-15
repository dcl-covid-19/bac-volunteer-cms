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

export interface IResourceErrors {
    provider_name?: string;
    resource?: string;
    counties?: string;
};

export const getResourceErrors = (resource: any) => {
    var errors: IResourceErrors = {};
    if (!resource.provider_name) {
        errors.provider_name = 'Name Required';
    }
    if (!resourceTypes[resource.resource]) {
        errors.resource = 'Resource Type Required';
    }
    if (allFieldsEqualBool(resource, counties, false)) {
        errors.counties = 'At least one county must be served';
    }
    return errors;
};
