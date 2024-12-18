import { writable } from "svelte/store";
import { Editor } from "@tiptap/core"; // Adjust the import as needed

export const useTiptapEditor = () => {
    const tiptapEditorStore = writable<Editor | null>(null);
    const tiptapProps = {
        onCreate: ({ editor }: { editor: Editor }) => {
            tiptapEditorStore.set(editor);
        },
        onDestroy: () => {
            tiptapEditorStore.update((editor) => {
                if (editor) {
                    editor.destroy(); // Clean up the editor
                }
                return null;
            });
        },
    };
    const tiptapActions = {
        isActive: () => {
            let state = false;
            tiptapEditorStore.subscribe((editor) => {
                state = !!editor;
            });
            return state;
        },
        isEmpty: () => {
            let state = false;
            tiptapEditorStore.subscribe((editor) => {
                state = editor?.getText().trim().length === 0;
            });
            return state;
        },
        getContent: () => {
            let content = undefined;
            if (tiptapEditorStore) {
                tiptapEditorStore.subscribe((editor) => {
                    content = JSON.stringify(editor?.getJSON());
                });
            }
            return content;
        },
        getJson: () => {
            let content = null;
            if (tiptapEditorStore) {
                tiptapEditorStore.subscribe((editor) => {
                    content = editor?.getJSON() as IEditorContent;
                });
            }
            return content;
        },
        getText: () => {
            let content = undefined;
            if (tiptapEditorStore) {
                tiptapEditorStore.subscribe((editor) => {
                    content = editor?.getText();
                });
            }
            return content;
        },
        getHTML: () => {
            let content = undefined;
            if (tiptapEditorStore) {
                tiptapEditorStore.subscribe((editor) => {
                    content = editor?.getHTML();
                });
            }
            return content;
        },
    };

    return [tiptapProps, tiptapActions];
};
