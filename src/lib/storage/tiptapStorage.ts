import { writable } from "svelte/store";

interface TiptapStorageProps {
    showComments: boolean;
    showResolved: boolean;
}

export const tiptapStorage = writable<TiptapStorageProps>({ showResolved: false, showComments: false });
