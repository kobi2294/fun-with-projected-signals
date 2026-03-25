import { ContactType } from "./models";

export interface WithResourceDemoSlice {
    readonly userId: number | null;    
    readonly isLoadingUserContacts: boolean;
    readonly contactDetails: Partial<Record<ContactType, string>>;
}

export const initialWithResourceDemoSlice: WithResourceDemoSlice = {
    isLoadingUserContacts: false,
    userId: null,
    contactDetails: {}
}
