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
  "special_hours": "Special Times Available",
  "ebt_online": "EBT Payment Available Online",
  "ebt_phone": "EBT Payment Available By Phone",
  "must_preorder": "Preorder Required",
  "pay_at_pickup": "Payment At Pickup Available",
  "in_store_pickup": "In Store Pickup Available",
  "curbside_pickup": "Curbside Pickup Available",
  "drive_thru": "Drive Through Available",
  "delivery": "Delivery Option Available",
  "farm_pickup": "Farm Pickup Option Availiable",
  "farmers_market": "Farmer's Market",
  "snap": "SNAP",
  "wic": "WIC",
  "in_person": "In Person Service",
  "telehealth": "Teleservice",
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
  "eligibility": {
    "__header": "Eligibility",
    "public": "Public",
    "seniors": "Seniors",
    "children": "Children",
    "homeless": "Homeless",
    "clients": "Clients",
    "uninsured": "Uninsured",
    "residents": "Residents",
    "low_income": "Low Income",
  },
  "legal_areas_served": {
    "__header": "Legal Areas Served",
    "legal_housing": "Housing Issues",
    "legal_worker_protection": "Worker Rights",
    "legal_healthcare": "Healthcare Enrollment",
    "legal_immigration": "Immigration Issues",
    "legal_criminal": "Criminal Justice",
    "legal_domviolence": "Domestic Violence",
    "legal_contracts": "Contracts Law",
  },
  "medical_services": {
    "__header": "Medical Services Offered",
    "med_primary_care": "Primary Care",
    "med_pediatrics": "Pediatric",
    "med_senior": "Senior Care",
    "med_women": "Women's Health",
    "med_urgent_care": "Urgent Care",
    "med_dental": "Dental",
    "med_vision": "Vision",
    "med_pharmacy": "Pharmacy",
    "med_benefit": "Health Benefit Programs",
    "med_mental_health": "Mental Health",
    "med_hotline": "Hotline",
    "med_domestic_violence": "Support for Domestic Violence Survivors",
    "med_addiction": "Addiction and Recovery",
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
    "legal_general_info": "Legal General Info (primarily a link for general knowledge or know-your-rights material)",
    "legal_assistance": "Legal Assistance (provides assistance e.g. counseling, court representation)",
    "health": "Medical Resource (provides one of several sub-categories)",
    "enrollment_support": "Enrollment Support (provides information on enrollment e.g. MediCal, CalFresh)"
  },
});

export const RESOURCE_CONDITION = Object.freeze({
  "payment": ["health", "legal_assistance", "legal_general_info"],
  "accepts_medical": ["health"],
  "ebt_online": ["grocery"],
  "ebt_phone": ["grocery"],
  "must_preorder": ["grocery"],
  "pay_at_pickup": ["grocery"],
  "in_store_pickup": ["grocery"],
  "curbside_pickup": ["grocery"],
  "drive_thru": ["grocery"],
  "delivery": ["grocery"],
  "farm_pickup": ["grocery"],
  "farmers_market": ["grocery"],
  "snap": ["grocery"],
  "wic": ["grocery"],
  "in_person": ["health", "legal_assistance", "legal_general_info"],
  "telehealth": ["health", "legal_assistance", "legal_general_info"],
  "legal_areas_served": ["legal_assistance", "legal_general_info"],
  "medical_services": ["health"],
});

export const NESTED_GROUPS = Object.freeze({ ...CHECKBOX_GROUPS, ...RADIO_GROUPS });

export const COMBO_COLUMNS = Object.freeze([
  {
    Header: "Address",
    id: "full_address",
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
  {
    Header: "Opening Hours (Senior Hours)",
    id: "sp_opening_hours",
    accessor: (row: IResource) => ([
      row.sp_mon && row.sp_mon !== '0' && `Monday ${row.sp_mon}`,
      row.sp_tues && row.sp_tues !== '0' && `Tuesday ${row.sp_tues}`,
      row.sp_wed && row.sp_wed !== '0' && `Wednesday ${row.sp_wed}`,
      row.sp_thr && row.sp_thr !== '0' && `Thursday ${row.sp_thr}`,
      row.sp_fri && row.sp_fri !== '0' && `Friday ${row.sp_fri}`,
      row.sp_sat && row.sp_sat !== '0' && `Saturday ${row.sp_sat}`,
      row.sp_sun && row.sp_sun !== '0' && `Sunday ${row.sp_sun}`,
    ].filter(x => !!x).join(', ')),
  },
]);

export const BOOLEAN_COLUMNS: readonly string[] = Object.freeze([
  "accepts_medical",
  "call_in_advance",
  "bob",
  "special_hours",
  "ebt_online",
  "ebt_phone",
  "must_preorder",
  "pay_at_pickup",
  "in_store_pickup",
  "curbside_pickup",
  "drive_thru",
  "delivery",
  "farm_pickup",
  "farmers_market",
  "snap",
  "wic",
  "in_person",
  "telehealth",
]);

export const DEFAULT_SHOWN = Object.freeze([
  "provider_name",
  "resource",
  "county",
  "eligibility",
  "payment",
  "accepts_medical",
  "in_person",
  "telehealth",
  "legal_areas_served",
  "medical_services",
  "snap",
  "wic",
  "last_update",
]);

const FORM_MAP = Object.freeze({
  "address": "Street Address",
  "city": "City",
  "state": "State",
  "zip": "ZIP",
});

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

export const FORM_FIELDS: any = Object.freeze({
  ...HEADERS,
  ...FORM_MAP,
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
  'provider_addloc': (addloc: string) => !!addloc,
  'resource': (resource: string) => OPTIONS.resource.hasOwnProperty(resource),
  'county': (county: string) => !!county,
  'payment': (payment: string) => !!payment && !payment.includes(','),
  'call_in_advance': (call_in_advance?: number | null) => call_in_advance != null,
  'contact': (contact: string) => !!contact,
  'notes': (notes: string) => !!notes,
  'accepts_medical': (accepts_medical?: number | null) => accepts_medical != null,
  'opening_hours': (opening_hours: string) => !!opening_hours,
  'ebt_online': (ebt_online?: number | null) => ebt_online != null,
  'ebt_phone': (ebt_phone?: number | null) => ebt_phone != null,
  'in_person': (in_person?: number | null) => in_person != null,
  'telehealth': (telehealth?: number | null) => telehealth != null,
  'eligibility': (eligibility: string) => !!eligibility,
  'legal_areas_served': (areas: string) => !!areas,
  'medical_services': (areas: string) => !!areas,
});
