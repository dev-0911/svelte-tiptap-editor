import { writable } from "svelte/store";

interface UserInfoProps {
    id: string;
    username: string;
    avatarUrl: string;
    color: string;
    aiToken: string;
    collabToken: string;
    convertToken: string;
}

export const userProfile = writable<UserInfoProps | null>(null);
