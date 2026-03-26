import { PartialStateUpdater } from "@ngrx/signals";
import { DelegateResourceUpdater } from "./delegate-resource";
import { ResourceSnapshot } from "@angular/core";

type Resolver<T, STATE extends object> = (state: STATE, val: T) => Partial<STATE>;
type Loader<STATE extends object> = (state: STATE) => Partial<STATE>;
type ErrorHandler<STATE extends object> = (state: STATE, err: unknown) => Partial<STATE>;

type Mapper<T, STATE extends object> = ((snapshot: ResourceSnapshot<T>) => PartialStateUpdater<STATE>);

export function resolved<T, STATE extends object>(r: Resolver<T, STATE>): Mapper<T, STATE> {
    return (snapshot) => {
        if (snapshot.status === 'resolved' && snapshot.value) {
            return (state) => r(state, snapshot.value);
        }
        return (state) => ({});
    }
}

export function loading<T, STATE extends object>(r: Loader<STATE>): Mapper<T, STATE> {
    return (snapshot) => {
        if ((snapshot.status === 'loading') || (snapshot.status === 'reloading')) {
            return (state) => r(state);
        }
        return (state) => ({});
    }
}

export function error<T, STATE extends object>(r: ErrorHandler<STATE>): Mapper<T, STATE> {
    return (snapshot) => {
        if (snapshot.status === 'error') {
            return (state) => r(state, snapshot.error);
        }   
        return (state) => ({});
    }
}

export function updaters<T, STATE extends object>(...mappers: Mapper<T, STATE>[]): DelegateResourceUpdater<T, STATE> {
    return (snapshot) => {
        return (state) => {
            let newState = state;
            for (const mapper of mappers) {
                const update = mapper(snapshot)(newState);
                newState = { ...newState, ...update };
            }
            return newState;
        };
    }
}