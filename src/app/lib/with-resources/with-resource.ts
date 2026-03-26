import {
  Prettify,
  SignalStoreFeature,
  SignalStoreFeatureResult,
  StateSignals,
  WritableStateSource,
} from '@ngrx/signals';
import { DelegateResource } from './delegate-resource';

export type DelegateResourceResult = {
  state: {};
  props: {};
  methods: {
    _reload(): boolean;
  };
};

export type DelegateResourceDictionary<STATE extends object> = Record<string, DelegateResource<any, STATE>>;

export type NamedDelegateResourceResult<STATE extends object, T extends DelegateResourceDictionary<STATE>> = {
  state: {};
  props: {};
  methods: {
    [Prop in keyof T as `_${Prop & string}Reload`]: () => boolean;
  };
};

export function withResources<
  Input extends SignalStoreFeatureResult,
  Dictionary extends DelegateResourceDictionary<Input['state']>,
>(
  factory: (
    store: Prettify<
      StateSignals<Input['state']> &
        Input['props'] &
        Input['methods'] &
        WritableStateSource<Input['state']>
    >,
  ) => Dictionary,
): SignalStoreFeature<Input, NamedDelegateResourceResult<Input['state'], Dictionary>> {
  throw new Error('Not implemented');
}
