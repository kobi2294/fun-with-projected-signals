import { ContactsApiResponse, ContactType } from "./models";
import { Mapping } from "./with-resource-demo.slice";

export function responseToMapping(response: ContactsApiResponse): Mapping<ContactType, string> {
    const contacts = response.contacts.map((e) => [e.type, e.value] as const);
    return Object.fromEntries(contacts);
}