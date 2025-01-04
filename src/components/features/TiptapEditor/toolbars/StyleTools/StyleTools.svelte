<script>
    import cn from "classnames";
    import StyleBoldIcon from "$components/assets/svg/editor/StyleBoldIcon.svelte";
    import StyleItalicIcon from "$components/assets/svg/editor/StyleItalicIcon.svelte";
    import StyleUnderlineIcon from "$components/assets/svg/editor/StyleUnderlineIcon.svelte";
    import StyleStrikeIcon from "$components/assets/svg/editor/StyleStrikeIcon.svelte";
    import StyleSuperscriptIcon from "$components/assets/svg/editor/StyleSuperscriptIcon.svelte";
    import StyleSubscriptIcon from "$components/assets/svg/editor/StyleSubscriptIcon.svelte";
    import Divider from "$components/shared/Divider/Divider.svelte";
    import SharedToolbarButton from "$components/shared/SharedToolbarButton/SharedToolbarButton.svelte";

    const { editor } = $props();

    let isActiveBold = $derived(editor?.isActive("bold"));
    let isActiveItalic = $derived(editor?.isActive("italic"));
    let isActiveUnderline = $derived(editor?.isActive("underline"));
    let isActiveStrike = $derived(editor?.isActive("strike"));
    let isActiveSuperscript = $derived(editor?.isActive("superscript"));
    let isActiveSubscript = $derived(editor?.isActive("subscript"));

    let isDisableBold = $derived(!editor.can().chain().focus().toggleBold().run());
    let isDisableItalic = $derived(!editor.can().chain().focus().toggleItalic().run());
    let isDisableUnderline = $derived(!editor.can().chain().focus().toggleUnderline().run());
    let isDisableStrike = $derived(!editor.can().chain().focus().toggleStrike().run());
    let isDisableSupscript = $derived(!editor.can().chain().focus().toggleSuperscript().run());
    let isDisableSubscript = $derived(!editor.can().chain().focus().toggleSubscript().run());

    const handleBold = () => {
        if (editor) editor.chain().focus().toggleBold().run();
    };

    const handleItalic = () => {
        if (editor) editor.chain().focus().toggleItalic().run();
    };

    const handleUnderline = () => {
        if (editor) editor.chain().focus().toggleUnderline().run();
    };

    const handleStrike = () => {
        if (editor) editor.chain().focus().toggleStrike().run();
    };

    const handleSuperScript = () => {
        if (editor) editor.chain().focus().toggleSuperscript().run();
    };

    const handleSubScript = () => {
        if (editor) editor.chain().focus().toggleSubscript().run();
    };
</script>

<div class="flex justify-start items-center gap-1">
    <SharedToolbarButton hint="Bold" onclick={handleBold} actived={isActiveBold} disabled={isDisableBold}>
        <StyleBoldIcon className={cn("fill-text-toolbar", isActiveBold && "fill-text-toolbar-selected", isDisableBold && "fill-text-toolbar-disabled")} />
    </SharedToolbarButton>
    <SharedToolbarButton hint="Italic" onclick={handleItalic} actived={isActiveItalic} disabled={isDisableItalic}>
        <StyleItalicIcon className={cn("fill-text-toolbar", isActiveItalic && "fill-text-toolbar-selected", isDisableItalic && "fill-text-toolbar-disabled")} />
    </SharedToolbarButton>
    <SharedToolbarButton hint="Underline" onclick={handleUnderline} actived={isActiveUnderline} disabled={isDisableUnderline}>
        <StyleUnderlineIcon className={cn("fill-text-toolbar", isActiveUnderline && "fill-text-toolbar-selected", isDisableUnderline && "fill-text-toolbar-disabled")} />
    </SharedToolbarButton>
    <SharedToolbarButton hint="Strike-throught" onclick={handleStrike} actived={isActiveStrike} disabled={isDisableStrike}>
        <StyleStrikeIcon className={cn("fill-text-toolbar", isActiveStrike && "fill-text-toolbar-selected", isDisableStrike && "fill-text-toolbar-disabled")} />
    </SharedToolbarButton>
    <Divider />
    <SharedToolbarButton hint="Superscript" onclick={handleSuperScript} actived={isActiveSuperscript} disabled={isDisableSupscript}>
        <StyleSuperscriptIcon className={cn("fill-text-toolbar", isActiveSuperscript && "fill-text-toolbar-selected", isDisableSupscript && "fill-text-toolbar-disabled")} />
    </SharedToolbarButton>
    <SharedToolbarButton hint="Subscript" onclick={handleSubScript} actived={isActiveSubscript} disabled={isDisableSubscript}>
        <StyleSubscriptIcon className={cn("fill-text-toolbar", isActiveSubscript && "fill-text-toolbar-selected", isDisableSubscript && "fill-text-toolbar-disabled")} />
    </SharedToolbarButton>
</div>
