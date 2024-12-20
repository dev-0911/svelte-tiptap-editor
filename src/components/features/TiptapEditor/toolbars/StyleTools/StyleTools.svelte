<script>
    import { Button, ButtonGroup } from "flowbite-svelte";
    import StyleBoldIcon from "$components/assets/svg/editor/StyleBoldIcon.svelte";
    import StyleItalicIcon from "$components/assets/svg/editor/StyleItalicIcon.svelte";
    import StyleUnderlineIcon from "$components/assets/svg/editor/StyleUnderlineIcon.svelte";
    import StyleStrikeIcon from "$components/assets/svg/editor/StyleStrikeIcon.svelte";

    export let editor;

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
</script>

<div class="flex justify-start items-center gap-1">
    <Button class="p-1 bg-background-toolbar hover:bg-background-toolbar-hovered rounded-sm" on:click={handleBold}>
        <StyleBoldIcon width="18px" height="18px" className="fill-text-toolbar" />
    </Button>
    <Button class="p-1 bg-background-toolbar hover:bg-background-toolbar-hovered rounded-sm" on:click={handleItalic}>
        <StyleItalicIcon width="18px" height="18px" className="fill-text-toolbar" />
    </Button>
    <Button class="p-1 bg-background-toolbar hover:bg-background-toolbar-hovered rounded-sm" on:click={handleUnderline}>
        <StyleUnderlineIcon width="18px" height="18px" className="fill-text-toolbar" />
    </Button>
    <Button class="p-1 bg-background-toolbar hover:bg-background-toolbar-hovered rounded-sm" on:click={handleStrike}>
        <StyleStrikeIcon width="18px" height="18px" className="fill-text-toolbar" />
    </Button>
</div>
