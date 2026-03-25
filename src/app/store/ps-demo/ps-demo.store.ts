import { signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { updateState, withDevtools } from "@angular-architects/ngrx-toolkit";
import { computed } from "@angular/core";
import { initialProjectedSignalDemoSlice } from "./ps-demo.slice";

export const ProjectedSignalDemoStore = signalStore(
    {providedIn: 'root'},
    withState(initialProjectedSignalDemoSlice), 
    withDevtools('Projected Signal Demo Store'), 
    withComputed(store => ({
        sum: computed(() => store.x() + store.y())
    })),
    withMethods(store => ({
        setXY(x: number, y: number) {
            updateState(store, 'set XY', { x, y });
        }
    }))
)