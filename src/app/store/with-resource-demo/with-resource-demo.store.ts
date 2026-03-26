import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { signalStore, withMethods, withState } from '@ngrx/signals';
import { initialWithResourceDemoSlice } from './with-resource-demo.slice';
import { withResources } from '../../lib/with-resources/with-resource';
import { delegateResource } from '../../lib/with-resources/delegate-resource';
import { resource } from '@angular/core';
import { getContactEntriesForUser } from './api';
import { error, loading, resolved, updaters } from '../../lib/with-resources/delegate-resource-mapper';
import { responseToMapping } from './model-utils';

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
      updaters(
        resolved((state, value) => ({
          contactDetails: { value: responseToMapping(value) }, 
          isLoadingUserContacts: false})),
        loading(state => ({ isLoadingUserContacts: true})), 
        error(state => ({ contactDetails: { error: 'Failed to load contacts' }, isLoadingUserContacts: false }))
      ),
    ),
  })),
  withMethods((store) => ({
    refreshContacts: () => store._userContactsReload(),
  })),
);
