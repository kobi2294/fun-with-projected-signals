import { Signal } from "@angular/core";

export interface ProjectedSignal<T> extends Signal<T> {
  set(value: T): void;
  update(updateFn: (value: T) => T): void;
  asReadonly(): Signal<T>;
}

export interface ProjectedSignalOptions<T> {
  computation: () => T;
  update: (value: T) => void;
}
