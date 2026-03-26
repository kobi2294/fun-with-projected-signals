import { Resource, ResourceRef, ResourceSnapshot } from "@angular/core"

export type DelegateResourceUpdater<T> = (snapshot: ResourceSnapshot<T>) => void;

export interface DelegateResource<T> {
    readonly resource: ResourceRef<T>;
    readonly updater: DelegateResourceUpdater<T>;
}

export function delegateResource<T>(resource: ResourceRef<T>, updater: DelegateResourceUpdater<T>): DelegateResource<T> {
    return {
        resource,
        updater
    };
}