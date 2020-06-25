import { Column } from 'react-table';

export type IResource = any;

export const COLUMNS: readonly Column<Object>[] = Object.freeze([
    { Header: "Last Updated", accessor: "last_update" },
    { Header: "Provider Name", accessor: "provider_name" },
    { Header: "Resource", accessor: "resource" },
    // { Header: "Region", accessor: "region" },
    { Header: "Address", accessor: "address" },
    // { Header: "ZIP", accessor: "zip" },
    // { Header: "Status", accessor: "status" },
    // { Header: "Free", accessor: "free" }
    { Header: "Black-Owned", accessor: "bob" },
    { Header: "Alameda", accessor: "alameda" },
    { Header: "Santa Clara", accessor: "santa_clara" },
    { Header: "San Mateo", accessor: "san_mateo" },
    { Header: "Contra Costa", accessor: "contra_costa" },
    { Header: "Marin", accessor: "marin" },
    { Header: "Monterey", accessor: "monterey" },
    { Header: "Sonoma", accessor: "sonoma" },
    { Header: "Solano", accessor: "solano" },
    { Header: "Napa", accessor: "napa" },
    { Header: "San Francisco", accessor: "san_francisco" },
]) as readonly Column<Object>[];

export const OPTIONS = Object.freeze({
    "county": {
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
    "resource": {
        "meal": "Free Food Provider",
        "grocery": "Grocery Provider",
        "core": "Core Service Agency (basic emergency and support services)",
        "financial": "Financial Assistance",
        "legal_general_info": "Legal General Info (primary a link for general knowledge or know-your-rights material)",
        "legal_assistance": "Legal Assistance (provides assistance e.g. counseling, court representation)",
        "health": "Medical Resource (provides one of several sub-categories)",
        "enrollment_support": "Enrollment Support (provides information on enrollment e.g. MediCal, CalFresh)"
    }
});

export const VALIDATORS: any = Object.freeze({
    'provider_name': (name: string) => !!name,
    'resource': (resource: string) => OPTIONS.resource.hasOwnProperty(resource),
});
