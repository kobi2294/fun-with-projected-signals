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

export type DelegateResourceDictionary = Record<string, DelegateResource<any>>;

export type NamedDelegateResourceResult<T extends DelegateResourceDictionary> = {
  state: {};
  props: {};
  methods: {
    [Prop in keyof T as `_${Prop & string}Reload`]: () => boolean;
  };
};

export function withResources<
  Input extends SignalStoreFeatureResult,
  Dictionary extends DelegateResourceDictionary,
>(
  factory: (
    store: Prettify<
      StateSignals<Input['state']> &
        Input['props'] &
        Input['methods'] &
        WritableStateSource<Input['state']>
    >,
  ) => Dictionary,
): SignalStoreFeature<Input, NamedDelegateResourceResult<Dictionary>> {
  throw new Error('Not implemented');
}
