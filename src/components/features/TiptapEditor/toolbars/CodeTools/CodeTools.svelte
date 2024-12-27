<script>
    import cn from "classnames";
    import CodeBlockIcon from "$components/assets/svg/editor/CodeBlockIcon.svelte";
    import SharedToolbarButton from "$components/shared/ShareToolbarButton/SharedToolbarButton.svelte";

    export let editor;

    const handleToggleCodeBlock = () => {
        editor.chain().focus().toggleCodeBlock().run();
    };
    $: isActivedCode = editor.isActive("codeBlock");
    $: isDisableCode = !editor.can().chain().focus().toggleCodeBlock().run();
</script>

<div class="flex justify-start items-center gap-1">
    <SharedToolbarButton actived={isActivedCode} disabled={isDisableCode} onClick={handleToggleCodeBlock}>
        <CodeBlockIcon
            width="18px"
            height="18px"
            className={cn("fill-text-toolbar", isActivedCode && "fill-text-toolbar-selected", isDisableCode && "fill-text-toolbar-disabled")} />
    </SharedToolbarButton>
</div>
