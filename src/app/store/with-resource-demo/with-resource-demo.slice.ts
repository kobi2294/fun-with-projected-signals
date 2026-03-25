import { ContactType } from "./models";

export interface WithResourceDemoSlice {
    readonly userId: number | null;    
    readonly contactDetails: Partial<Record<ContactType, string>>;
}

export const initialWithResourceDemoSlice: WithResourceDemoSlice = {
    userId: null,
    contactDetails: {}
}
