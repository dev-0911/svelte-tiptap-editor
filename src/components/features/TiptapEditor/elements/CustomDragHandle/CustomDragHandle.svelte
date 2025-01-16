<script>
    import { useDragItem } from "./hooks/useDragItem";

    import { EmojiButton } from "@joeattardi/emoji-button";

    import { onMount } from "svelte";
    import { DragHandlePlugin } from "@tiptap-pro/extension-drag-handle";

    import SharedDropdown from "$components/shared/SharedDropdown/SharedDropdown.svelte";
    import SharedBubbleMenuItem from "$components/shared/SharedBubbleMenuItem/SharedBubbleMenuItem.svelte";

    import PlusIcon from "$components/assets/svg/editor/PlusIcon.svelte";
    import DragHandlerIcon from "$components/assets/svg/editor/DragHandlerIcon.svelte";
    import InsertTableIcon from "$components/assets/svg/editor/InsertTableIcon.svelte";
    import InsertImageIcon from "$components/assets/svg/editor/InsertImageIcon.svelte";
    import CmdSelectIcon from "$components/assets/svg/editor/CmdSelectIcon.svelte";
    import CmdDuplicateIcon from "$components/assets/svg/editor/CmdDuplicateIcon.svelte";
    import CmdCopyIcon from "$components/assets/svg/editor/CmdCopyIcon.svelte";
    import CmdTrashIcon from "$components/assets/svg/editor/CmdTrashIcon.svelte";
    import EmojiPicker from "$components/shared/EmojiPicker/EmojiPicker.svelte";
    import EmojiIcon from "$components/assets/svg/editor/EmojiIcon.svelte";
    import MinusIcon from "$components/assets/svg/editor/MinusIcon.svelte";
    import CommentIcon from "$components/assets/svg/editor/CommentIcon.svelte";
    import InsertEx from "$components/assets/svg/editor/InsertEx.svelte";

    let { editor, onComments } = $props();
    let element;
    let trigger;

    const picker = new EmojiButton();

    picker.on("emoji", (selection) => {
        dispatch("change", selection);
    });

    function togglePicker() {
        picker.togglePicker(trigger);
    }

    const { onNodeChange, onSelect, onDuplicate, onCopy, onDelete, onAddTable, onAddImage, onAddMath } = useDragItem(editor);

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

    let createNodeMenuOpen = $state(false);
    let editNodeMenuOpen = $state(false);

    let emojiState = $state(false);

    const initState = () => {
        createNodeMenuOpen = false;
        editNodeMenuOpen = false;
        emojiState = false;
    };

    // $effect(() => {
    //     if (editor) {
    //         editor.commands.setMeta("lockDragHandle", editNodeMenuOpen || createNodeMenuOpen);
    //     }
    // });

    const handleSelect = () => {
        onSelect();
        editor.commands.setMeta("lockDragHandle", false);
        initState();
    };

    const handleComments = () => {
        onComments(() => {
            editor.commands.setMeta("lockDragHandle", false);
            initState();
        });
    };

    const handleDuplicate = () => {
        onDuplicate();
        editor.commands.setMeta("lockDragHandle", false);
        initState();
    };

    const handleCopy = () => {
        onCopy();
        editor.commands.setMeta("lockDragHandle", false);
        initState();
    };

    const handleDelete = () => {
        onDelete();
        editor.commands.setMeta("lockDragHandle", false);
        initState();
    };

    const handleAddTable = () => {
        onAddTable();
        editor.commands.setMeta("lockDragHandle", false);
        initState();
    };

    const handleAddImage = () => {
        onAddImage();
        editor.commands.setMeta("lockDragHandle", false);
        initState();
    };

    const handleAddMath = () => {
        onAddMath();
        editor.commands.setMeta("lockDragHandle", false);
        initState();
    };

    const handleAddEmoji = () => {
        emojiState = true;
    };

    const handleEmojiClick = (detail) => {
        const emojiCode = detail.emoji.shortcodes[0];
        if (emojiCode) {
            editor.chain().focus().setEmoji(emojiCode).run();
        }
        editor.commands.setMeta("lockDragHandle", false);
        initState();
    };

    const handleAddHorizon = () => {
        editor.chain().focus().setHorizontalRule().run();
        editor.commands.setMeta("lockDragHandle", false);
        initState();
    };
</script>

<div bind:this={element} draggable="false" style="pointer-events: none;">
    <div class="flex justify-start items-center gap-1">
        <button
            draggable="false"
            class="p-1 flex justify-center items-center bg-transparent hover:bg-background-hovered"
            onClick={() => {
                createNodeMenuOpen = !createNodeMenuOpen;
                editor.commands.setMeta("lockDragHandle", editNodeMenuOpen || createNodeMenuOpen);
            }}>
            <PlusIcon width="16px" height="16px" className="fill-text cursor-pointer" />
        </button>

        <SharedDropdown placement="right-start" bind:open={createNodeMenuOpen} className="w-44">
            {#if !emojiState}
                <SharedBubbleMenuItem onClick={handleAddTable} label="Tables">
                    <InsertTableIcon />
                </SharedBubbleMenuItem>
                <SharedBubbleMenuItem onClick={handleAddImage} label="Images">
                    <InsertImageIcon />
                </SharedBubbleMenuItem>
                <SharedBubbleMenuItem onClick={handleAddMath} label="Math">
                    <InsertEx />
                </SharedBubbleMenuItem>
                <SharedBubbleMenuItem onClick={handleAddEmoji} label="Emojis">
                    <EmojiIcon />
                </SharedBubbleMenuItem>

                <!-- <SharedBubbleMenuItem onClick={handleAddImage} label="Math">
                    <InsertImageIcon />
                </SharedBubbleMenuItem> -->
                <SharedBubbleMenuItem onClick={handleAddHorizon} label="Horizontal rule">
                    <MinusIcon />
                </SharedBubbleMenuItem>
            {:else}
                <EmojiPicker onClick={handleEmojiClick} />
            {/if}
        </SharedDropdown>

        <button
            draggable="true"
            class="p-1 flex justify-center items-center bg-transparent hover:bg-background-hovered"
            onClick={() => {
                editNodeMenuOpen = !editNodeMenuOpen;
                editor.commands.setMeta("lockDragHandle", editNodeMenuOpen || createNodeMenuOpen);
            }}>
            <DragHandlerIcon className="fill-text cursor-grab" />
        </button>

        <SharedDropdown placement="right-start" bind:open={editNodeMenuOpen}>
            <SharedBubbleMenuItem onClick={handleSelect} label="Select"><CmdSelectIcon /></SharedBubbleMenuItem>
            <SharedBubbleMenuItem onClick={handleComments} label="Comments"><CommentIcon /></SharedBubbleMenuItem>
            <SharedBubbleMenuItem onClick={handleDuplicate} label="Duplicate"><CmdDuplicateIcon /></SharedBubbleMenuItem>
            <SharedBubbleMenuItem onClick={handleCopy} label="Copy"><CmdCopyIcon /></SharedBubbleMenuItem>
            <SharedBubbleMenuItem onClick={handleDelete} label="Delete"><CmdTrashIcon /></SharedBubbleMenuItem>
        </SharedDropdown>
    </div>
</div>
