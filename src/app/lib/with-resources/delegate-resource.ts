import { Resource, ResourceRef, ResourceSnapshot } from "@angular/core"
import { PartialStateUpdater } from "@ngrx/signals";

export type DelegateResourceUpdater<T, STATE extends object> = (snapshot: ResourceSnapshot<T>) => PartialStateUpdater<STATE>;

export interface DelegateResource<T, STATE extends object> {
    readonly resource: ResourceRef<T>;
    readonly updater: DelegateResourceUpdater<T, STATE>;
}

export function delegateResource<T, STATE extends object>(resource: ResourceRef<T>, updater: DelegateResourceUpdater<T, STATE>): DelegateResource<T, STATE> {
    return {
        resource,
        updater
    };
}