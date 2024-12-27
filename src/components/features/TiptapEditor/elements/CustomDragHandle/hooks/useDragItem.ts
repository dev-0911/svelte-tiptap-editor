import type { Editor } from "@tiptap/core";
import type { Node } from "@tiptap/pm/model";
import type { NodeSelection } from "@tiptap/pm/state";
import { writable } from "svelte/store";

type DragNodeType = {
    node: Node | null;
    pos: number;
};

export const useDragItem = (editor: Editor | null) => {
    // const currentNode = writable<DragNodeType | null>(null);
    let currentNode: Node | null = null;
    let currentNodePos = -1;

    const onNodeChange = (data: { node: Node | null; editor: Editor; pos: number }) => {
        if (data.node) {
            currentNode = data.node;
            currentNodePos = data.pos;
        }
    };

    const onDuplicate = () => {
        if (!editor || !currentNode) return;

        editor.commands.setNodeSelection(currentNodePos);
        const { $anchor } = editor.state.selection;
        const selectedNode = $anchor.node(1) || (editor.state.selection as NodeSelection).node;

        editor
            .chain()
            .setMeta("hideDragHandle", true)
            .insertContentAt(currentNodePos + (currentNode?.nodeSize || 0), selectedNode.toJSON())
            .run();
        // }
    };

    const onCopy = () => {
        if (!editor || !currentNode) return;

        editor.commands.setNodeSelection(currentNodePos);
        const { $anchor } = editor.state.selection;
        const selectedNode = $anchor.node(1) || (editor.state.selection as NodeSelection).node;

        editor.chain().setMeta("hideDragHandle", true).setNodeSelection(currentNodePos).run();
        document.execCommand("copy");
    };
    const onDelete = () => {
        if (!editor || !currentNode) return;

        editor.chain().setMeta("hideDragHandle", true).setNodeSelection(currentNodePos).deleteSelection().run();
    };

    const onSetColor = () => {
        if (!editor || !currentNode) return;
    };

    const onSetBgColor = () => {
        if (!editor || !currentNode) return;
    };

    return { currentNode, onNodeChange, onDuplicate, onCopy, onDelete, onSetColor, onSetBgColor };
};
