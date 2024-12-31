<script>
    import cn from "classnames";
    import { onMount, onDestroy } from "svelte";
    import { DragHandlePlugin } from "@tiptap-pro/extension-drag-handle";

    import DragHandlerIcon from "$components/assets/svg/editor/DragHandlerIcon.svelte";
    import PlusIcon from "$components/assets/svg/editor/PlusIcon.svelte";
    import { Button, Dropdown, DropdownItem } from "flowbite-svelte";

    import { useDragItem } from "./hooks/useDragItem";
    import SharedBubbleMenuItem from "$components/shared/SharedBubbleMenuItem/SharedBubbleMenuItem.svelte";
    import InsertTableIcon from "$components/assets/svg/editor/InsertTableIcon.svelte";
    import InsertImageIcon from "$components/assets/svg/editor/InsertImageIcon.svelte";
    import CmdDuplicateIcon from "$components/assets/svg/editor/CmdDuplicateIcon.svelte";
    import CmdCopyIcon from "$components/assets/svg/editor/CmdCopyIcon.svelte";
    import CmdTrashIcon from "$components/assets/svg/editor/CmdTrashIcon.svelte";
    import SharedDropdown from "$components/shared/SharedDropdown/SharedDropdown.svelte";

    export let editor;
    let element;

    $: createNodeMenuOpen = false;
    $: editNodeMenuOpen = false;
    $: colorSubmenuOpen = false;

    $: {
        if (editor) {
            editor.commands.setMeta("lockDragHandle", editNodeMenuOpen || createNodeMenuOpen);
        }
    }

    const { onNodeChange, onDuplicate, onCopy, onDelete, onSetColor, onSetBgColor } = useDragItem(editor);

    onMount(() => {
        const plugin = DragHandlePlugin({
            pluginKey: "dragHandle",
            editor,
            element,
            tippyOptions: { theme: "drag-item", placement: "left-start", arrow: false, offset: [-1, 0], zIndex: 99 },
            onNodeChange,
        });

        editor.registerPlugin(plugin);

        return () => editor.unregisterPlugin("dragHandle");
    });

    const handleDragMenuOpen = () => {
        editor.commands.setMeta("lockDragHandle", true);
    };

    const handleDuplicate = () => {
        onDuplicate();
        editor.commands.setMeta("lockDragHandle", false);
        editNodeMenuOpen = false;
        createNodeMenuOpen = false;
    };

    const handleCopy = () => {
        onCopy();
        editor.commands.setMeta("lockDragHandle", false);
        editNodeMenuOpen = false;
        createNodeMenuOpen = false;
    };

    const handleDelete = () => {
        onDelete();
        editor.commands.setMeta("lockDragHandle", false);
        editNodeMenuOpen = false;
        createNodeMenuOpen = false;
    };

    const handleColor = () => {
        editor.commands.setMeta("lockDragHandle", false);
        editNodeMenuOpen = false;
        createNodeMenuOpen = false;
    };

    const handleAddTable = () => {
        editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: false }).run();
        editor.commands.setMeta("lockDragHandle", false);
        editNodeMenuOpen = false;
        createNodeMenuOpen = false;
    };

    const handleAddImage = () => {
        editor.chain().focus().setImageUpload().run();
        editor.commands.setMeta("lockDragHandle", false);
        editNodeMenuOpen = false;
        createNodeMenuOpen = false;
    };
</script>

<div bind:this={element} draggable="false" style="pointer-events: none;">
    <div class="flex justify-start items-center gap-1">
        <div draggable="false" class="p-1 flex justify-center items-center bg-transparent hover:bg-background-hovered">
            <PlusIcon width="16px" height="16px" className="fill-text cursor-pointer" />
        </div>

        <SharedDropdown placement="right" bind:open={createNodeMenuOpen} on:show={handleDragMenuOpen} className="w-44">
            <SharedBubbleMenuItem onClick={handleAddTable} label="Insert a table">
                <InsertTableIcon width="16px" height="16px" />
            </SharedBubbleMenuItem>
            <SharedBubbleMenuItem onClick={handleAddImage} label="Insert an image">
                <InsertImageIcon width="16px" height="16px" />
            </SharedBubbleMenuItem>
        </SharedDropdown>

        <button draggable="true" class="p-1 flex justify-center items-center bg-transparent hover:bg-background-hovered">
            <DragHandlerIcon width="16px" height="16px" className="fill-text cursor-grab" />
        </button>

        <SharedDropdown placement="right" bind:open={editNodeMenuOpen} on:show={handleDragMenuOpen}>
            <SharedBubbleMenuItem onClick={handleDuplicate} label="Duplicate"><CmdDuplicateIcon width="16px" height="16px" /></SharedBubbleMenuItem>
            <SharedBubbleMenuItem onClick={handleCopy} label="Copy"><CmdCopyIcon width="16px" height="16px" /></SharedBubbleMenuItem>
            <SharedBubbleMenuItem onClick={handleDelete} label="Delete"><CmdTrashIcon width="16px" height="16px" /></SharedBubbleMenuItem>
        </SharedDropdown>
    </div>
</div>

<!-- transition:fade={{ duration: 200 }} -->
