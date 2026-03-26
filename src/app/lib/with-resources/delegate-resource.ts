import { Resource, ResourceRef, ResourceSnapshot } from "@angular/core"

export interface DelegateResourceOptions<T> {
    readonly resource: ResourceRef<T>;
    readonly updater: (ref: ResourceSnapshot<T>) => void
}

export interface DelegateResource<T> {
    readonly resource: ResourceRef<T>;
    readonly updater: (ref: ResourceSnapshot<T>) => void
}

export function delegateResource<T>(config: DelegateResourceOptions<T>): DelegateResource<T> {
    return {
        ...config
    };
}