<script>
    import { onMount, onDestroy } from "svelte";

    import { BubbleMenuPlugin } from "@tiptap/extension-bubble-menu";
    import { Button, Input, Toggle, Tooltip } from "flowbite-svelte";
    import CmdEditIcon from "$components/assets/svg/editor/CmdEditIcon.svelte";
    import CmdUnlinkIcon from "$components/assets/svg/editor/CmdUnlinkIcon.svelte";
    import Divider from "$components/shared/Divider/Divider.svelte";
    import CmdLinkIcon from "$components/assets/svg/editor/CmdLinkIcon.svelte";
    import SharedBubbleMenu from "$components/shared/SharedBubbleMenu/SharedBubbleMenu.svelte";
    import SharedBubbleMenuButton from "$components/shared/SharedBubbleMenuButton/SharedBubbleMenuButton.svelte";

    export let editor;

    let element;
    let showEdit = false;
    let inputValue;
    $: url = editor.getAttributes("link").href;
    $: sanitizedLink = url?.startsWith("javascript:") ? "" : url;
    $: isValidUrl = /^(\S+):(\/\/)?\S+$/.test(inputValue);
    $: isChecked = false;

    console.log(url, sanitizedLink);
    onMount(() => {
        const plugin = BubbleMenuPlugin({
            pluginKey: "linkBubbleMenu",
            editor,
            element,
            tippyOptions: {
                theme: "bubble-menu",
                placement: "top-start",
                popperOptions: {
                    modifiers: [{ name: "flip", enabled: false }],
                },
                appendTo: () => {
                    return document.getElementById("PORTAL-ROOT");
                },
                onHidden: () => {
                    showEdit = false;
                },
                arrow: false,
            },
            shouldShow: ({ editor }) => {
                return editor.isActive("link");
            },
        });

        editor.registerPlugin(plugin);

        return () => editor.unregisterPlugin("linkBubbleMenu");
    });

    const handleEdit = () => {
        showEdit = true;
        inputValue = url;
    };
    const handleSet = () => {
        editor
            .chain()
            .focus()
            .setLink({ href: inputValue, target: isChecked ? "_blank" : "" })
            .run();
        showEdit = false;
    };
    const handleRemove = () => {
        editor.chain().focus().extendMarkRange("link").unsetLink().run();
        showEdit = false;
    };
</script>

<div bind:this={element}>
    {#if showEdit}
        <div class="border border-border-toolbar bg-background-toolbar p-2 rounded-md">
            <div class="mb-2 flex justify-start items-center gap-2">
                <Input id="input-addon" name="link-url" type="url" placeholder="Enter URL" size="sm" class="bg-white text-text" bind:value={inputValue}>
                    <CmdLinkIcon slot="left" />
                </Input>

                <Button class="bg-text" size="sm" disabled={!isValidUrl} on:click={handleSet}>Set</Button>
            </div>
            <Toggle bind:checked={isChecked} size="small" class="text-text-toolbar">
                <svelte:fragment slot="offLabel">Open in new tab</svelte:fragment>
            </Toggle>
        </div>
    {:else}
        <SharedBubbleMenu>
            <div class="flex justify-start items-center gap-2">
                <a href={sanitizedLink} target="_blank" class="text-sm underline break-all">
                    {url}
                </a>

                <Divider />
                <SharedBubbleMenuButton onClick={handleEdit} label="Edit link"><CmdEditIcon /></SharedBubbleMenuButton>
                <SharedBubbleMenuButton onClick={handleRemove} label="Remove link"><CmdUnlinkIcon /></SharedBubbleMenuButton>
            </div>
        </SharedBubbleMenu>
    {/if}
</div>

<!-- transition:fade={{ duration: 200 }} -->
<!-- rel="noopener noreferrer"  -->
