import { Column } from 'react-table';

export type IResource = any;

export const CHECKBOX_GROUPS = Object.freeze({
  "county": {
    "__header": "Counties Served",
    "alameda": "Alameda",
    "santa_clara": "Santa Clara",
    "san_mateo": "San Mateo",
    "contra_costa": "Contra Costa",
    "marin": "Marin",
    "monterey": "Monterey",
    "sonoma": "Sonoma",
    "solano": "Solano",
    "napa": "Napa",
    "san_francisco": "San Francisco"
  },
});

const SIMPLE_HEADERS = Object.freeze({
  "last_update": "Last Updated",
  "provider_name": "Provider Name",
  "resource": "Resource",
  "region": "Region",
  "address": "Address",
  "bob": "Black-Owned",
});

const HEADERS_PLUS_CHECKBOX = Object.keys(CHECKBOX_GROUPS).reduce(
  (acc: object, field: string) => ({
    ...acc,
    ...CHECKBOX_GROUPS[field as keyof typeof CHECKBOX_GROUPS],
  }),
  SIMPLE_HEADERS as object,
);

const { __header, ...HEADERS } = HEADERS_PLUS_CHECKBOX as any;
export { HEADERS };

export const COLUMNS: readonly Column<Object>[] = Object.freeze(
  Object.keys(SIMPLE_HEADERS).map(
    key => ({ Header: HEADERS[key], accessor: key })
  ),
) as readonly Column<Object>[];

export const BOOLEAN_COLUMNS: readonly string[] = Object.freeze([
  "bob",
  "alameda",
  "santa_clara",
  "san_mateo",
  "contra_costa",
  "marin",
  "monterey",
  "sonoma",
  "solano",
  "napa",
  "san_francisco",
]);

export const OPTIONS = Object.freeze({
  "resource": {
    "meal": "Free Food Provider",
    "grocery": "Grocery Provider",
    "core": "Core Service Agency (basic emergency and support services)",
    "financial": "Financial Assistance",
    "legal_general_info": "Legal General Info (primary a link for general knowledge or know-your-rights material)",
    "legal_assistance": "Legal Assistance (provides assistance e.g. counseling, court representation)",
    "health": "Medical Resource (provides one of several sub-categories)",
    "enrollment_support": "Enrollment Support (provides information on enrollment e.g. MediCal, CalFresh)"
  },
});

export const VALIDATORS: any = Object.freeze({
  'provider_name': (name: string) => !!name,
  'resource': (resource: string) => OPTIONS.resource.hasOwnProperty(resource),
});
