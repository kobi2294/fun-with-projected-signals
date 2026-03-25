import { withDevtools } from "@angular-architects/ngrx-toolkit";
import { signalStore, withState } from "@ngrx/signals";
import { initialWithResourceDemoSlice } from "./with-resource-demo.slice";

export const WithResourceDemoStore = signalStore(
    {providedIn: 'root'},
    withState(initialWithResourceDemoSlice), 
    withDevtools('With Resource Demo Store'), 
)