import {
  IResource,
  BOOLEAN_COLUMNS,
} from 'utils/constants';

export const toBoolean = (resource: IResource) => ({
  ...resource,
  ...BOOLEAN_COLUMNS.reduce(
    (acc: object, field: string) => ({ ...acc, [field]: !!resource[field] }),
    {},
  ),
});

export const fromBoolean = (resource: IResource) => ({
  ...resource,
  ...BOOLEAN_COLUMNS.reduce(
    (acc: object, field: string) => ({ ...acc, [field]: Number(resource[field]) }),
    {}
  ),
});
