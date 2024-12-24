<script>
    import { Button, ButtonGroup } from "flowbite-svelte";
    import StyleBoldIcon from "$components/assets/svg/editor/StyleBoldIcon.svelte";
    import StyleItalicIcon from "$components/assets/svg/editor/StyleItalicIcon.svelte";
    import StyleUnderlineIcon from "$components/assets/svg/editor/StyleUnderlineIcon.svelte";
    import StyleStrikeIcon from "$components/assets/svg/editor/StyleStrikeIcon.svelte";
    import StyleSuperscriptIcon from "$components/assets/svg/editor/StyleSuperscriptIcon.svelte";
    import StyleSubscriptIcon from "$components/assets/svg/editor/StyleSubscriptIcon.svelte";
    import Divider from "$components/shared/Divider/Divider.svelte";

    export let editor;

    $: isActiveBold = editor?.isActive("bold");
    $: isActiveItalic = editor?.isActive("italic");
    $: isActiveUnderline = editor?.isActive("underline");
    $: isActiveStrike = editor?.isActive("strike");
    $: isActiveSuper = editor?.isActive("superscript");
    $: isActiveSub = editor?.isActive("subscripte");

    $: isDisableBold = !editor?.can()?.chain()?.focus()?.toggleBold()?.run();
    $: isDisableItalic = !editor?.can()?.chain()?.focus()?.toggleItalic()?.run();
    $: isDisableUnderline = !editor?.can()?.chain()?.focus()?.toggleUnderline()?.run();
    $: isDisableStrike = !editor?.can()?.chain()?.focus()?.toggleStrike()?.run();
    $: isDisableSuper = !editor.can().chain().focus().toggleSuperscript().run();
    $: isDisableSub = !editor.can().chain().focus().toggleSubscript().run();

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
    <Button class="p-1 bg-background-toolbar hover:bg-background-toolbar-hovered rounded-sm" on:click={handleBold} disabled={isDisableBold}>
        <StyleBoldIcon width="18px" height="18px" className={!isActiveBold ? "fill-text-toolbar" : "fill-text-toolbar-selected"} />
    </Button>
    <Button class="p-1 bg-background-toolbar hover:bg-background-toolbar-hovered rounded-sm" on:click={handleItalic} disabled={isDisableItalic}>
        <StyleItalicIcon width="18px" height="18px" className={!isActiveItalic ? "fill-text-toolbar" : "fill-text-toolbar-selected"} />
    </Button>
    <Button class="p-1 bg-background-toolbar hover:bg-background-toolbar-hovered rounded-sm" on:click={handleUnderline} disabled={isDisableUnderline}>
        <StyleUnderlineIcon width="18px" height="18px" className={!isActiveUnderline ? "fill-text-toolbar" : "fill-text-toolbar-selected"} />
    </Button>
    <Button class="p-1 bg-background-toolbar hover:bg-background-toolbar-hovered rounded-sm" on:click={handleStrike} disabled={isDisableStrike}>
        <StyleStrikeIcon width="18px" height="18px" className={!isActiveStrike ? "fill-text-toolbar" : "fill-text-toolbar-selected"} />
    </Button>
    <Divider />
    <Button class="p-1 bg-background-toolbar hover:bg-background-toolbar-hovered rounded-sm" on:click={handleSuperScript} disabled={isDisableSuper}>
        <StyleSuperscriptIcon width="18px" height="18px" className={!isActiveSuper ? "fill-text-toolbar" : "fill-text-toolbar-selected"} />
    </Button>
    <Button class="p-1 bg-background-toolbar hover:bg-background-toolbar-hovered rounded-sm" on:click={handleSubScript} disabled={isDisableSub}>
        <StyleSubscriptIcon width="18px" height="18px" className={!isActiveSub ? "fill-text-toolbar" : "fill-text-toolbar-selected"} />
    </Button>
</div>
