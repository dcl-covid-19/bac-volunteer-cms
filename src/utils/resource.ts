import {
  IResource,
  BOOLEAN_COLUMNS,
  CHECKBOX_GROUPS,
  RADIO_GROUPS,
  NESTED_GROUPS,
} from 'utils/constants';

export const fromBoolean = (resource: IResource) => ({
  ...resource,
  ...BOOLEAN_COLUMNS.reduce(
    (acc: object, field: string) => ({ ...acc, [field]: Number(resource[field]) }),
    {}
  ),
});

// county: [a, b, c] => {a:1, b:1, c:1, d:0}
export const toFlat =
    (resource: IResource) => Object.keys(NESTED_GROUPS).reduce(
  (partial: any, field: string) => {
    const { [field]: nest, ...rest } = partial;
    if (nest == null) {
      return partial;
    }
    const list = Array.isArray(nest) ? nest : [nest];
    const ones = list.reduce(
      (acc: object, key: string) => ({ ...acc, [key]: 1 }),
      {},
    );
    const zeros = Object.keys(
      NESTED_GROUPS[field as keyof typeof NESTED_GROUPS]
    ).filter(
      key => key !== '__header' && !list.includes(key)
    ).reduce(
      (acc: object, key: string) => ({ ...acc, [key]: 0 }),
      {},
    );
    return { ...rest, ...ones, ...zeros };
  },
  resource,
);

// {a:1, b:1, c:1, d:0} => county: [a, b, c]
export const toCheckboxes =
    (resource: IResource) => Object.keys(CHECKBOX_GROUPS).reduce(
  (partial: any, field: string) => ({
    ...partial,
    [field]: Object.keys(
      CHECKBOX_GROUPS[field as keyof typeof CHECKBOX_GROUPS]
    ).filter(
      key => key !== '__header' && !!partial[key]
    ),
  }),
  resource,
);

// {a:1, b:0, c:0, d:0} => payment: a
export const toRadio =
    (resource: IResource) => Object.keys(RADIO_GROUPS).reduce(
  (partial: any, field: string) => {
    const matches = Object.keys(
      RADIO_GROUPS[field as keyof typeof RADIO_GROUPS]
    ).filter(
      key => key !== '__header' && !!partial[key]
    );
    return {
      ...partial,
      [field]: matches.length === 1 ? matches[0] : '',
    };
  },
  resource,
);

export const toForm = (resource: IResource) => (
  toCheckboxes(toRadio(resource))
);
export const fromForm = (resource: IResource) => toFlat(fromBoolean(resource));
