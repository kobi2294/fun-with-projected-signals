import { updateState, withDevtools } from '@angular-architects/ngrx-toolkit';
import { signalStore, withMethods, withState } from '@ngrx/signals';
import { initialWithResourceDemoSlice } from './with-resource-demo.slice';
import { withResources } from '../../lib/with-resources/with-resource';
import { delegateResource } from '../../lib/with-resources/delegate-resource';
import { resource } from '@angular/core';
import { getContactEntriesForUser } from './api';
import { ContactsApiResponse } from './models';
import {
  composeUpdaters,
  onError,
  onLoading,
  onResolved,
} from '../../lib/with-resources/delegate-resource-updaters';
import { setContacts, setContactsError, setLoadingContacts } from './with-resource-demo.updaters';

export const WithResourceDemoStore = signalStore(
  { providedIn: 'root' },
  withState(initialWithResourceDemoSlice),
  withDevtools('With Resource Demo Store'),
  withResources((store) => ({
    userContacts: delegateResource(
      resource({
        params: () => store.userId(),
        loader: (req) => getContactEntriesForUser(req.params),
        defaultValue: { contacts: [] },
      }),
      composeUpdaters(
        onResolved(val => updateState(store, 'Contacts Loaded', setContacts(val))),
        onLoading(() => updateState(store, 'Loading Contacts', setLoadingContacts())),
        onError(err => updateState(store, 'Error Loading Contacts', setContactsError(err))),
      ),
    ),
  })),
  withMethods((store) => ({
    refreshContacts: () => store._userContactsReload(),
  })),
);
