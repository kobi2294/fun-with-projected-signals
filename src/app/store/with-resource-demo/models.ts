
export type ContactType = 'modile' | 'email' | 'fax' | 'landline';

export interface ContactEntry {
    readonly type: ContactType;
    readonly value: string;
}


export interface ContactsApiResponse {
    readonly contacts: ContactEntry[];
}
