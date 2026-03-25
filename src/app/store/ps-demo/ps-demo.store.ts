import { signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { updateState, withDevtools } from "@angular-architects/ngrx-toolkit";
import { computed } from "@angular/core";
import { initialPsDemoSlice } from "./ps-demo.slice";

export const PsDemoStore = signalStore(
    {providedIn: 'root'},
    withState(initialPsDemoSlice), 
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