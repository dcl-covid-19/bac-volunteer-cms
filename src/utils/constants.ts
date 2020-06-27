import { Column } from 'react-table';

export type IResource = any;

export const ACTIONS = 'actions';

const SIMPLE_HEADERS = Object.freeze({
  "resource": "Resource",
  "accepts_medical": "Accepts Medi-Cal",
  "provider_name": "Provider Name",
  "provider_addloc": "Provider Location/Branch",
  "contact": "Phone Number",
  "call_in_advance": "Call In Advance",
  "region": "Region",
  "bob": "Black-Owned",
  "last_update": "Last Updated",
  "email": "Provider email",
  "notes": "Notes",
  "notes_es": "Notes (Spanish)",
  "web_link": "Website",
  "web_link_es": "Website (Spanish)",
  "status": "Status",
});

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

export const RADIO_GROUPS = Object.freeze({
  "payment": {
    "__header": "Payment Type",
    "free": "Free",
    "sliding_scale": "Sliding Scale",
    "financial_assistance": "Discounts Available",
  }
});

export const SIMPLE_OPTIONS = Object.freeze({
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

export const RESOURCE_CONDITION = Object.freeze({
  "payment": ["health", "legal_assistance", "legal_general_info"],
});

export const NESTED_GROUPS = Object.freeze({ ...CHECKBOX_GROUPS, ...RADIO_GROUPS });

export const COMBO_COLUMNS = Object.freeze([
  {
    Header: "Address",
    id: "address",
    accessor: (row: IResource) => (
      `${row.address}, ${row.city}, ${row.state} ${row.zip}`
    ),
  },
  {
    Header: "Opening Hours",
    id: "opening_hours",
    accessor: (row: IResource) => ([
      row.mon && row.mon !== '0' && `Monday ${row.mon}`,
      row.tues && row.tues !== '0' && `Tuesday ${row.tues}`,
      row.wed && row.wed !== '0' && `Wednesday ${row.wed}`,
      row.thr && row.thr !== '0' && `Thursday ${row.thr}`,
      row.fri && row.fri !== '0' && `Friday ${row.fri}`,
      row.sat && row.sat !== '0' && `Saturday ${row.sat}`,
      row.sun && row.sun !== '0' && `Sunday ${row.sun}`,
    ].filter(x => !!x).join(', ')),
  },
]);

export const BOOLEAN_COLUMNS: readonly string[] = Object.freeze([
  "accepts_medical",
  "call_in_advance",
  "bob",
]);

export const DEFAULT_SHOWN = Object.freeze([
  "provider_name",
  "resource",
  "county",
  "payment",
  "last_update",
]);

const NESTED_HEADERS = Object.keys(NESTED_GROUPS).reduce(
  (acc: object, field: string) => ({
    ...acc,
    [field]: NESTED_GROUPS[field as keyof typeof CHECKBOX_GROUPS].__header,
  }),
  {},
);

const COMBO_HEADERS = COMBO_COLUMNS.reduce(
  (acc: object, column: Column<Object>) => ({
    ...acc,
    [column.id as string]: column.Header,
  }),
  {},
);

export const HEADERS: any = Object.freeze({
  ...SIMPLE_HEADERS,
  ...NESTED_HEADERS,
  ...COMBO_HEADERS,
});

const SIMPLE_COLUMNS: readonly Column<Object>[] = Object.freeze(
  Object.keys(SIMPLE_HEADERS).map(
    key => ({ Header: (SIMPLE_HEADERS as any)[key], accessor: key })
  ),
) as readonly Column<Object>[];

const NESTED_COLUMNS: readonly Column<Object>[] = Object.freeze(
  Object.keys(NESTED_GROUPS).map(
    key => ({
      Header: HEADERS[key],
      accessor: (row: IResource) => {
        return Object.keys((NESTED_GROUPS as any)[key]).filter(
          field => field !== '__header' && row[field]
        ).map(
          field => (NESTED_GROUPS as any)[key][field]
        ).join(', ')
      },
      id: key,
    })
  ),
) as readonly Column<Object>[];

export const COLUMNS = Object.freeze([
  ...SIMPLE_COLUMNS,
  ...NESTED_COLUMNS,
  ...COMBO_COLUMNS,
]);

const FLAT_OPTIONS = Object.keys(RADIO_GROUPS).reduce(
  (acc: object, field: string) => {
    const group = RADIO_GROUPS[field as keyof typeof RADIO_GROUPS];
    const { __header, ...rest } = group;
    return { ...acc, [field]: rest };
  },
  {}
);

export const OPTIONS: any = Object.freeze({
  ...SIMPLE_OPTIONS,
  ...FLAT_OPTIONS,
});

export const VALIDATORS: any = Object.freeze({
  'provider_name': (name: string) => !!name,
  'resource': (resource: string) => OPTIONS.resource.hasOwnProperty(resource),
  'county': (county: string) => !!county,
  'payment': (payment: string) => !!payment && !payment.includes(','),
  'bob': (bob?: number | null) => bob != null,
});
