import { PartialStateUpdater } from "@ngrx/signals";
import { DelegateResourceUpdater } from "./delegate-resource";

export function onResolved<T, STATE extends object>(action: (val : T) => PartialStateUpdater<STATE>)
    : DelegateResourceUpdater<T> {
        return (snapshot) => {
            if (snapshot.status === 'resolved' && snapshot.value) {
                action(snapshot.value);
            }
        }
}

export function onLoading<T, STATE extends object>(action: () => PartialStateUpdater<STATE>)
    : DelegateResourceUpdater<T> {
        return (snapshot) => {
            if ((snapshot.status === 'loading') || (snapshot.status === 'reloading')) {
                action();
            }
        }
}

export function onError<T, STATE extends object>(action: (err: unknown) => PartialStateUpdater<STATE>)
    : DelegateResourceUpdater<T> {
        return (snapshot) => {
            if (snapshot.status === 'error') {
                action(snapshot.error);
            }
        }
}

export function composeUpdaters<T>(...updaters: DelegateResourceUpdater<T>[]): DelegateResourceUpdater<T> {
    return (snapshot) => {
        for (const updater of updaters) {
            updater(snapshot);
        }
    }
}