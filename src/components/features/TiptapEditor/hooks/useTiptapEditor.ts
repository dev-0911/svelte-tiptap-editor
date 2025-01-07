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
        replaceWithText: (text: string) => {
            if (tiptapEditorStore) {
                tiptapEditorStore.subscribe((editor) => {
                    if (editor) {
                        editor.commands.deleteSelection(); // Delete the selected text
                        editor.commands.insertContent(text); // Insert new text
                    }
                });
            }
        },
        addWithText: (text: string) => {
            if (tiptapEditorStore) {
                tiptapEditorStore.subscribe((editor) => {
                    if (editor) {
                        const { from, to } = editor.state.selection;
                        // Move the cursor to the end of the selected text
                        editor.commands.setTextSelection(to);
                        // Execute a new line to insert below the selected text
                        editor.commands.insertContent("<p>" + text + "</p>");
                        // Optionally, move the selection to the end of the inserted text
                        editor.commands.setTextSelection(to + text.length + 7); // 7 accounts for <p></p> tags
                    }
                });
            }
        },
        insertBelow: (text: string) => {
            if (tiptapEditorStore) {
                tiptapEditorStore.subscribe((editor) => {
                    if (editor) {
                        const { to } = editor.state.selection;
                        // Get the position right after the selected text
                        const posBelowSelection = to; // 'to' points to the end of the selection

                        // Create a transaction to insert the new text
                        const transaction = editor.state.tr.insertText(text, posBelowSelection);

                        // Dispatch the transaction
                        editor.view.dispatch(transaction);
                    }
                });
            }
        },
        insertAbove: (text: string) => {
            if (tiptapEditorStore) {
                tiptapEditorStore.subscribe((editor) => {
                    if (editor) {
                        const { from } = editor.state.selection;
                        // Move the cursor to the end of the selected text
                        // Get the position of the node above the selection
                        // const posAboveSelection = editor.state.doc.resolve(from - 1).before(); // or use to - 1 depending on your needs
                        const posAboveSelection = from - 1; // 'to' points to the end of the selection
                        // Create a transaction to insert the new text
                        const transaction = editor.state.tr.insertText(text, posAboveSelection);

                        // Dispatch the transaction
                        editor.view.dispatch(transaction);
                    }
                });
            }
        },
    };

    return [tiptapProps, tiptapActions];
};
