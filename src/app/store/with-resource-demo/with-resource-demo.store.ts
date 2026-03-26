import { updateState, withDevtools } from '@angular-architects/ngrx-toolkit';
import { signalStore, withMethods, withState } from '@ngrx/signals';
import { initialWithResourceDemoSlice } from './with-resource-demo.slice';
import { withResources } from '../../lib/with-resources/with-resource';
import { delegateResource } from '../../lib/with-resources/delegate-resource';
import { resource } from '@angular/core';
import { getContactEntriesForUser } from './api';
import { ContactsApiResponse } from './models';

export const WithResourceDemoStore = signalStore(
  { providedIn: 'root' },
  withState(initialWithResourceDemoSlice),
  withDevtools('With Resource Demo Store'),
  withResources((store) => ({
    userContacts: delegateResource({
      resource: resource({
        params: () => store.userId(),
        loader: (req) => getContactEntriesForUser(req.params),
        defaultValue: { contacts: [] },        
      }),
      updater: (snapshot) => {
        if (snapshot.status === 'resolved' && snapshot.value) {
          const contacts = snapshot.value.contacts.map(
            (entry) => [entry.type, entry.value] as const,
          );
          const details = Object.fromEntries(contacts);
          updateState(store, 'userContactDetails', details, { isLoadingUserContacts: false });
        } else if (snapshot.status === 'loading') {
          updateState(store, 'isLoadingUserContacts', { isLoadingUserContacts: true });
        }
      },
    }),
  })),
  withMethods(store => ({
    refreshContacts: () => store._userContactsReload(),
  }))
);
