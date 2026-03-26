import { PartialStateUpdater } from "@ngrx/signals";
import { DelegateResourceUpdater } from "./delegate-resource";

type Resolver<T> = (val: T) => void;
type Loader = () => void;
type ErrorHandler = (err: unknown) => void;

export function onResolved<T>(action: Resolver<T>)
    : DelegateResourceUpdater<T> {
        return (snapshot) => {
            if (snapshot.status === 'resolved' && snapshot.value) {
                action(snapshot.value);
            }
        }
}

export function onLoading<T>(action: Loader)
    : DelegateResourceUpdater<T> {
        return (snapshot) => {
            if ((snapshot.status === 'loading') || (snapshot.status === 'reloading')) {
                action();
            }
        }
}

export function onError<T>(action: ErrorHandler)
    : DelegateResourceUpdater<T> {
        return (snapshot) => {
            if (snapshot.status === 'error') {
                action(snapshot.error);
            }
        }
}

export function updaters<T>(...updaters: DelegateResourceUpdater<T>[]): DelegateResourceUpdater<T> {
    return (snapshot) => {
        for (const updater of updaters) {
            updater(snapshot);
        }
    }
}