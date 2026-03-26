import { ContactType } from "./models";

export type MaybeError<T> = {value: T} | { error: unknown };
export type Mapping<K extends string | symbol | number, T> = Partial<Record<K, T>>;

export interface WithResourceDemoSlice {
    readonly userId: number | null;    
    readonly isLoadingUserContacts: boolean;
    readonly contactDetails: MaybeError<Mapping<ContactType, string>>;
}

export const initialWithResourceDemoSlice: WithResourceDemoSlice = {
    isLoadingUserContacts: false,
    userId: null,
    contactDetails: { value: {} }
}
