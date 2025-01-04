<script>
    import cn from "classnames";
    import CmdUndoIcon from "$components/assets/svg/editor/CmdUndoIcon.svelte";
    import CmdRedoIcon from "$components/assets/svg/editor/CmdRedoIcon.svelte";
    import SharedToolbarButton from "$components/shared/SharedToolbarButton/SharedToolbarButton.svelte";

    const { editor } = $props();

    let isUndoDisabled = $derived(!editor.can().chain().focus().undo().run());
    let isRedoDisabled = $derived(!editor.can().chain().focus().redo().run());
</script>

<div class="flex justify-start items-center gap-1">
    <SharedToolbarButton hint="Undo" disabled={isUndoDisabled} onclick={() => editor?.chain().focus().undo().run()}>
        <CmdUndoIcon className={cn("fill-text-toolbar", isUndoDisabled && "fill-text-toolbar-disabled")} />
    </SharedToolbarButton>
    <SharedToolbarButton hint="Redo" disabled={isRedoDisabled} onclick={() => editor?.chain().focus().redo().run()}>
        <CmdRedoIcon className={cn("fill-text-toolbar", isRedoDisabled && "fill-text-toolbar-disabled")} />
    </SharedToolbarButton>
</div>
