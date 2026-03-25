import { Resource, resource, ResourceRef } from "@angular/core"

export interface DelegateResourceOptions<T> {
    readonly resource: Resource<T>;
    readonly updater: (ref: ResourceRef<T>) => void
}

export function delegateResource<T>(config: DelegateResourceOptions<T>) {
    const x = resource({
        params: () => 2, 
        loader: (req) => Promise.resolve(req.params * 2), 
        defaultValue: 0
    });

}