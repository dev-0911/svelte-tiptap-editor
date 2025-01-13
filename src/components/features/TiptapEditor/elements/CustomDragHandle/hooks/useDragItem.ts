import type { Editor } from "@tiptap/core";
import type { Node } from "@tiptap/pm/model";
import type { NodeSelection } from "@tiptap/pm/state";

export const useDragItem = (editor: Editor | null) => {
    let currentNode: Node | null = null;
    let currentNodePos = -1;

    const onNodeChange = (data: { node: Node | null; editor: Editor; pos: number }) => {
        if (data.node) {
            currentNode = data.node;
            currentNodePos = data.pos;
        }
    };

    const onSelect = () => {
        if (!editor || !currentNode) return;

        editor.chain().setMeta("hideDragHandle", true);
        editor.commands.focus();
        editor.commands.setTextSelection({ from: currentNodePos, to: currentNodePos + currentNode?.nodeSize || 0 });
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

    const onAddTable = () => {
        if (!editor || !currentNode) return;

        editor.chain().setMeta("hideDragHandle", true);
        editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: false }).run();
    };

    const onAddImage = () => {
        if (!editor || !currentNode) return;

        editor.chain().setMeta("hideDragHandle", true);
        editor.chain().focus().setImageUpload().setNodeSelection(currentNodePos).run();
    };

    const onAddMath = () => {
        if (!editor || !currentNode) return;

        editor.chain().setMeta("hideDragHandle", true);
        editor.chain().focus().setMathBlock().setNodeSelection(currentNodePos).run();
    };

    return { currentNode, onNodeChange, onSelect, onDuplicate, onCopy, onDelete, onAddTable, onAddImage, onAddMath };
};
