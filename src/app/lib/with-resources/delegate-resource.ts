import { Resource, resource, ResourceRef, ResourceSnapshot } from "@angular/core"

export interface DelegateResourceOptions<T> {
    readonly resource: Resource<T>;
    readonly updater: (ref: ResourceSnapshot<T>) => void
}

export interface DelegateResource<T> {
}

export function delegateResource<T>(config: DelegateResourceOptions<T>): DelegateResource<T> {
    return {}
}