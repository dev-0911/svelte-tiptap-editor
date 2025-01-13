<script>
    import { onMount } from "svelte";
    import { BubbleMenuPlugin } from "@tiptap/extension-bubble-menu";
    import { Input, Label } from "flowbite-svelte";

    import CmdEditIcon from "$components/assets/svg/editor/CmdEditIcon.svelte";
    import CmdUnlinkIcon from "$components/assets/svg/editor/CmdUnlinkIcon.svelte";

    import { BubbleMenuButton, BubbleMenuDivider, BubbleMenuInput, BubbleMenuLabel, BubbleMenuLink } from "$components/shared/BubbleMenu";

    export let editor;

    let element;
    let showEdit = false;
    let inputValue;

    $: url = editor.getAttributes("link").href;
    $: sanitizedLink = url?.startsWith("javascript:") ? "" : url;
    $: isValidUrl = /^(\S+):(\/\/)?\S+$/.test(inputValue);

    onMount(() => {
        const plugin = BubbleMenuPlugin({
            pluginKey: "linkBubbleMenu",
            editor,
            element,
            tippyOptions: {
                theme: "bubble-menu",
                placement: "top",
                arrow: false,
                popperOptions: {
                    modifiers: [{ name: "flip", enabled: false }],
                },
                appendTo: () => {
                    return document.getElementById("PORTAL-ROOT");
                },
                onHidden: () => {
                    showEdit = false;
                },
            },
            shouldShow: ({ editor }) => {
                return editor.isActive("link");
            },
        });

        editor.registerPlugin(plugin);

        return () => editor.unregisterPlugin("linkBubbleMenu");
    });

    const handleEditClick = () => {
        showEdit = true;
        inputValue = url;
    };

    const handleSetClick = () => {
        editor.chain().focus().extendMarkRange("link").setLink({ href: inputValue, target: "_blank" }).run();
        showEdit = false;
    };

    const handleRemoveClick = () => {
        editor.chain().focus().extendMarkRange("link").unsetLink().run();
        showEdit = false;
    };
</script>

<div bind:this={element}>
    {#if !showEdit}
        <div class="flex justify-start items-center gap-2">
            <BubbleMenuLink href={sanitizedLink} label={url} />
            <BubbleMenuDivider />
            <BubbleMenuButton onclick={handleEditClick} tooltip="Edit"><CmdEditIcon /></BubbleMenuButton>
            <BubbleMenuButton onclick={handleRemoveClick} tooltip="Remove"><CmdUnlinkIcon /></BubbleMenuButton>
        </div>
    {:else}
        <div class="min-w-60">
            <div class="mb-1">
                <BubbleMenuLabel>Page or Url</BubbleMenuLabel>
            </div>
            <div class="mb-1">
                <BubbleMenuInput type="url" placeholder="Enter URL" bind:value={inputValue} />
            </div>
            <div class="flex justify-end">
                <BubbleMenuButton size="sm" disabled={!isValidUrl} onclick={handleSetClick}>Set</BubbleMenuButton>
            </div>
        </div>
    {/if}
</div>

<!-- transition:fade={{ duration: 200 }} -->
<!-- rel="noopener noreferrer"  -->
