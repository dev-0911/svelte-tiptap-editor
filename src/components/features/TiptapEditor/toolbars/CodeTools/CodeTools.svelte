<script>
    import cn from "classnames";
    import CodeBlockIcon from "$components/assets/svg/editor/CodeBlockIcon.svelte";
    import SharedToolbarButton from "$components/shared/SharedToolbarButton/SharedToolbarButton.svelte";

    const { editor } = $props();

    const handleToggleCodeBlock = () => {
        editor.chain().focus().toggleCodeBlock().run();
    };
    let isActivedCode = $derived(editor.isActive("codeBlock"));
    let isDisableCode = $derived(!editor.can().chain().focus().toggleCodeBlock().run());
</script>

<div class="flex justify-start items-center gap-1">
    <SharedToolbarButton hint="Code block" actived={isActivedCode} disabled={isDisableCode} onclick={handleToggleCodeBlock}>
        <CodeBlockIcon className={cn("fill-text-toolbar", isActivedCode && "fill-text-toolbar-selected", isDisableCode && "fill-text-toolbar-disabled")} />
    </SharedToolbarButton>
</div>
