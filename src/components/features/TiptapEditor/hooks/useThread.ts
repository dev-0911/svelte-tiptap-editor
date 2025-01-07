import type { Editor } from "@tiptap/core";
import type { TiptapCollabProvider } from "@hocuspocus/provider";
import { hoverOffThread, hoverThread } from "@tiptap-pro/extension-comments";

export const useThread = (editor: Editor, provider: TiptapCollabProvider) => {
    const deleteThread = (threadId: string) => {
        provider.deleteThread(threadId);
        editor.commands.removeThread({ id: threadId });
    };

    const onHoverThread = (threadId: number) => {
        console.log("Hover thread", threadId);
        // hoverThread(editor, [threadId]);
    };

    const onLeaveThread = () => {
        hoverOffThread(editor);
        console.log("Leave thread");
    };

    const resolveThread = (threadId: string) => {
        editor.commands.resolveThread({ id: threadId });
    };

    const unresolveThread = (threadId: string) => {
        editor.commands.unresolveThread({ id: threadId });
    };
    return {
        resolveThread,
        unresolveThread,
        onHoverThread,
        onLeaveThread,
        deleteThread,
    };
};
