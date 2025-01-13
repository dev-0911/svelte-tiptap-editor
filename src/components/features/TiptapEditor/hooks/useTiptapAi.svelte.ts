import type { OnAiEventContext, OnChunkContext, OnSuccessContext } from "@tiptap-pro/extension-ai";
import { writable } from "svelte/store";

export type AiData = {
    isLoading: boolean;
    state: string | undefined;
    response: string | undefined;
};

export const useTiptapAi = () => {
    let aiData = $state<AiData>({
        isLoading: false,
        state: undefined,
        response: "",
    });
    let aiResponse = $state<string | undefined>("");
    let aiState = $state("");

    const onLoading = (context: OnAiEventContext) => {
        console.log("loading");
        aiData = {
            isLoading: true,
            state: "loading",
            response: "",
        };
        aiResponse = "";
        aiState = "loading";
    };
    const onChunk = (context: OnChunkContext) => {
        console.log("chunk");
    };
    const onSuccess = (context: OnSuccessContext) => {
        console.log("success", context.response);
        aiData = {
            isLoading: true,
            state: "success",
            response: context.response,
        };
        aiResponse = context.response;
        aiState = "loading";
    };
    const onError = (error: Error, context: OnAiEventContext) => {
        console.log("error");
        aiData = {
            isLoading: true,
            state: "error",
            response: "",
        };
    };

    return {
        aiData,
        aiState,
        aiResponse,
        onLoading,
        onChunk,
        onSuccess,
        onError,
    };
};
