<script>
    import cn from "classnames";
    import StyleBoldIcon from "$components/assets/svg/editor/StyleBoldIcon.svelte";
    import StyleItalicIcon from "$components/assets/svg/editor/StyleItalicIcon.svelte";
    import StyleUnderlineIcon from "$components/assets/svg/editor/StyleUnderlineIcon.svelte";
    import StyleStrikeIcon from "$components/assets/svg/editor/StyleStrikeIcon.svelte";
    import StyleSuperscriptIcon from "$components/assets/svg/editor/StyleSuperscriptIcon.svelte";
    import StyleSubscriptIcon from "$components/assets/svg/editor/StyleSubscriptIcon.svelte";
    import Divider from "$components/shared/Divider/Divider.svelte";
    import SharedToolbarButton from "$components/shared/ShareToolbarButton/SharedToolbarButton.svelte";

    export let editor;

    $: isActiveBold = editor?.isActive("bold");
    $: isActiveItalic = editor?.isActive("italic");
    $: isActiveUnderline = editor?.isActive("underline");
    $: isActiveStrike = editor?.isActive("strike");
    $: isActiveSuperscript = editor?.isActive("superscript");
    $: isActiveSubscript = editor?.isActive("subscript");

    $: isDisableBold = !editor.can().chain().focus().toggleBold().run();
    $: isDisableItalic = !editor.can().chain().focus().toggleItalic().run();
    $: isDisableUnderline = !editor.can().chain().focus().toggleUnderline().run();
    $: isDisableStrike = !editor.can().chain().focus().toggleStrike().run();
    $: isDisableSupscript = !editor.can().chain().focus().toggleSuperscript().run();
    $: isDisableSubscript = !editor.can().chain().focus().toggleSubscript().run();

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
    <SharedToolbarButton onClick={handleBold} actived={isActiveBold} disabled={isDisableBold}>
        <StyleBoldIcon
            width="18px"
            height="18px"
            className={cn("fill-text-toolbar", isActiveBold && "fill-text-toolbar-selected", isDisableBold && "fill-text-toolbar-disabled")} />
    </SharedToolbarButton>
    <SharedToolbarButton onClick={handleItalic} actived={isActiveItalic} disabled={isDisableItalic}>
        <StyleItalicIcon
            width="18px"
            height="18px"
            className={cn("fill-text-toolbar", isActiveItalic && "fill-text-toolbar-selected", isDisableItalic && "fill-text-toolbar-disabled")} />
    </SharedToolbarButton>
    <SharedToolbarButton onClick={handleUnderline} actived={isActiveUnderline} disabled={isDisableUnderline}>
        <StyleUnderlineIcon
            width="18px"
            height="18px"
            className={cn("fill-text-toolbar", isActiveUnderline && "fill-text-toolbar-selected", isDisableUnderline && "fill-text-toolbar-disabled")} />
    </SharedToolbarButton>
    <SharedToolbarButton onClick={handleStrike} actived={isActiveStrike} disabled={isDisableStrike}>
        <StyleStrikeIcon
            width="18px"
            height="18px"
            className={cn("fill-text-toolbar", isActiveStrike && "fill-text-toolbar-selected", isDisableStrike && "fill-text-toolbar-disabled")} />
    </SharedToolbarButton>
    <Divider />
    <SharedToolbarButton onClick={handleSuperScript} actived={isActiveSuperscript} disabled={isDisableSupscript}>
        <StyleSuperscriptIcon
            width="18px"
            height="18px"
            className={cn("fill-text-toolbar", isActiveSuperscript && "fill-text-toolbar-selected", isDisableSupscript && "fill-text-toolbar-disabled")} />
    </SharedToolbarButton>
    <SharedToolbarButton onClick={handleSubScript} actived={isActiveSubscript} disabled={isDisableSubscript}>
        <StyleSubscriptIcon
            width="18px"
            height="18px"
            className={cn("fill-text-toolbar", isActiveSubscript && "fill-text-toolbar-selected", isDisableSubscript && "fill-text-toolbar-disabled")} />
    </SharedToolbarButton>
</div>
