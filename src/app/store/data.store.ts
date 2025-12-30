import { signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { initialDataSlice } from "./data.slice";
import { updateState, withDevtools } from "@angular-architects/ngrx-toolkit";
import { computed } from "@angular/core";

export const DataStore = signalStore(
    {providedIn: 'root'},
    withState(initialDataSlice), 
    withDevtools('Data Store'), 
    withComputed(store => ({
        sum: computed(() => store.x() + store.y())
    })),
    withMethods(store => ({
        setSum(sum: number) {
            updateState(store, 'set Sum', state => ({
                y: sum - state.x,
            }));
        }
    }))
)