import type { Editor } from "@tiptap/core";
import type { TiptapCollabProvider } from "@hocuspocus/provider";
import { hoverOffThread, hoverThread } from "@tiptap-pro/extension-comments";

export const useThread = (provider: TiptapCollabProvider, editor: Editor) => {
    const onHoverThread = (threadId: number) => {
        hoverThread(editor, [threadId]);
        console.log("Hover thread", threadId);
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

    const deleteThread = (threadId: string) => {
        provider.deleteThread(threadId);
        editor.commands.removeThread({ id: threadId });
    };

    return {
        deleteThread,
        resolveThread,
        unresolveThread,
        onHoverThread,
        onLeaveThread,
    };
};
