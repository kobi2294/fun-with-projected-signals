import { PartialStateUpdater } from '@ngrx/signals';
import { WithResourceDemoSlice } from './with-resource-demo.slice';
import { ContactsApiResponse } from './models';

export function setContacts(
  result: ContactsApiResponse,
): PartialStateUpdater<WithResourceDemoSlice> {
  const contacts = result.contacts.map((e) => [e.type, e.value] as const);
  const details = Object.fromEntries(contacts);
  return (state) => ({
    userContactDetails: { value: details },
    isLoadingUserContacts: false,
  });
}

export function setLoadingContacts(): PartialStateUpdater<WithResourceDemoSlice> {
  return (state) => ({
    isLoadingUserContacts: true,
  });
}

export function setContactsError(err: unknown): PartialStateUpdater<WithResourceDemoSlice> {
  return (state) => ({
    userContactDetails: { error: err },
    isLoadingUserContacts: false,
  });
}