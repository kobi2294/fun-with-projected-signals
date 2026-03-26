import { ContactsApiResponse } from "./models";

export const SOME_DETAILS: ContactsApiResponse = {
    contacts: [
        { type: 'email', value: 'someone@gmail.com'}, 
        { type: 'fax', value: 'who uses fax these days?'}, 
        { type: 'landline', value: '5234234234'}, 
        { type: 'modile', value: '064-1231231'}
    ]
}

export function delay(millis: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, millis));
}

export function getContactEntriesForUser(userId: number | null): Promise<ContactsApiResponse> {
    return delay(1000).then(() => SOME_DETAILS);
}