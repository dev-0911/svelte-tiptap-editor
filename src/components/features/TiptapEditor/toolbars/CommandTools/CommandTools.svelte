<script>
    import cn from "classnames";
    import CmdUndoIcon from "$components/assets/svg/editor/CmdUndoIcon.svelte";
    import CmdRedoIcon from "$components/assets/svg/editor/CmdRedoIcon.svelte";
    import SharedToolbarButton from "$components/shared/ShareToolbarButton/SharedToolbarButton.svelte";
    export let editor;

    $: isUndoDisabled = !editor.can().chain().focus().undo().run();
    $: isRedoDisabled = !editor.can().chain().focus().redo().run();
</script>

<div class="flex justify-start items-center gap-1">
    <SharedToolbarButton disabled={isUndoDisabled} onClick={() => editor?.chain().focus().undo().run()}>
        <CmdUndoIcon width="18px" height="18px" className={cn("fill-text-toolbar", isUndoDisabled && "fill-text-toolbar-disabled")} />
    </SharedToolbarButton>
    <SharedToolbarButton disabled={isRedoDisabled} onClick={() => editor?.chain().focus().redo().run()}>
        <CmdRedoIcon width="18px" height="18px" className={cn("fill-text-toolbar", isRedoDisabled && "fill-text-toolbar-disabled")} />
    </SharedToolbarButton>
</div>
