<script>
    import { onMount, onDestroy } from "svelte";

    import DragHandlerIcon from "$components/assets/svg/editor/DragHandlerIcon.svelte";
    import PlusIcon from "$components/assets/svg/editor/PlusIcon.svelte";
    import { BubbleMenuPlugin } from "@tiptap/extension-bubble-menu";
    import { Button, Dropdown, DropdownItem } from "flowbite-svelte";

    import { useDragItem } from "./hooks/useDragItem";

    export let editor;
    export let tippyOptions = {};

    export let className;
    let element;

    $: dragMenuOpen = false;
    $: colorSubmenuOpen = false;

    $: {
        if (editor) {
            editor.commands.setMeta("lockDragHandle", !!dragMenuOpen);
        }
    }

    const { onNodeChange, onDuplicate, onCopy, onDelete, onSetColor, onSetBgColor } = useDragItem(editor);

    onMount(() => {
        const plugin = BubbleMenuPlugin({
            pluginKey: "linkBubbleMenu",
            editor,
            element,
            tippyOptions,
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
        dragMenuOpen = false;
    };

    const handleCopy = () => {
        onCopy();
        editor.commands.setMeta("lockDragHandle", false);
        dragMenuOpen = false;
    };

    const handleDelete = () => {
        onDelete();
        editor.commands.setMeta("lockDragHandle", false);
        dragMenuOpen = false;
    };

    const handleColor = () => {
        editor.commands.setMeta("lockDragHandle", false);
        dragMenuOpen = false;
    };
</script>

<div bind:this={element} class={className} draggable="false" style="pointer-events: none;">
    <div class="flex justify-start items-center gap-1">
        <div draggable="false" class="p-1 flex justify-center items-center bg-transparent hover:bg-background-hovered">
            <PlusIcon width="16px" height="16px" className="fill-text cursor-pointer" />
        </div>
        <button draggable="true" class="p-1 flex justify-center items-center bg-transparent hover:bg-background-hovered">
            <DragHandlerIcon width="16px" height="16px" className="fill-text cursor-grab" />
        </button>

        <Dropdown
            placement="right"
            bind:open={dragMenuOpen}
            on:show={handleDragMenuOpen}
            class="p-2 bg-white border border-solid border-border rounded-md !text-text !text-sm drop-shadow-md">
            <DropdownItem on:click={handleDuplicate}>Duplicate</DropdownItem>
            <DropdownItem on:click={handleCopy}>Copy</DropdownItem>
            <DropdownItem on:click={handleDelete}>Delete</DropdownItem>
        </Dropdown>
    </div>
</div>

<!-- transition:fade={{ duration: 200 }} -->
