<script>
    import { Button, ButtonGroup } from "flowbite-svelte";
    import CmdUndoIcon from "$components/assets/svg/editor/CmdUndoIcon.svelte";
    import CmdRedoIcon from "$components/assets/svg/editor/CmdRedoIcon.svelte";
    export let editor;

    $: isUndoDisabled = !editor.can().chain().focus().undo().run();
    $: isRedoDisabled = !editor.can().chain().focus().redo().run();
</script>

<div class="flex justify-start items-center gap-1">
    <Button class="p-1 bg-background-toolbar hover:bg-background-toolbar-hovered rounded-sm" disabled={isUndoDisabled} on:click={() => editor?.chain().focus().undo().run()}>
        <CmdUndoIcon width="18px" height="18px" className={isUndoDisabled ? "fill-text-toolbar" : "fill-text-toolbar-selected"} />
    </Button>
    <Button class="p-1 bg-background-toolbar hover:bg-background-toolbar-hovered rounded-sm" disabled={isRedoDisabled} on:click={() => editor?.chain().focus().redo().run()}>
        <CmdRedoIcon width="18px" height="18px" className={isUndoDisabled ? "fill-text-toolbar" : "fill-text-toolbar-selected"} />
    </Button>
</div>
