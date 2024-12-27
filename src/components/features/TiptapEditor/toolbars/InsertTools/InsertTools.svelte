<script>
    import { Button, ButtonGroup, Dropdown, Input, InputAddon, Toggle } from "flowbite-svelte";
    import CodeBlockIcon from "$components/assets/svg/editor/CodeBlockIcon.svelte";
    import CmdLinkIcon from "$components/assets/svg/editor/CmdLinkIcon.svelte";

    export let editor;

    let inputValue;
    $: isValidUrl = /^(\S+):(\/\/)?\S+$/.test(inputValue);
    $: isChecked = false;
    $: linkDropdownOpen = false;
    const handleSetUrl = () => {
        editor
            .chain()
            .focus()
            .setLink({ href: inputValue, target: isChecked ? "_blank" : "" })
            .run();
        linkDropdownOpen = false;
    };
</script>

<div class="flex justify-start items-center gap-1">
    <Button class="p-1 bg-background-toolbar hover:bg-background-toolbar-hovered rounded-sm">
        <CmdLinkIcon width="18px" height="18px" />
    </Button>

    <Dropdown offset="10" class="min-w-56 p-2 bg-background-toolbar border border-border-toolbar rounded-sm" bind:open={linkDropdownOpen}>
        <div class="mb-2 flex justify-start items-center gap-2">
            <Input id="input-addon" name="link-url" type="url" placeholder="Enter URL" size="sm" class="bg-white text-text" bind:value={inputValue}>
                <CmdLinkIcon slot="left" width="18px" height="18px" />
            </Input>

            <Button class="bg-text" size="sm" disabled={!isValidUrl} on:click={handleSetUrl}>Set</Button>
        </div>
        <Toggle bind:checked={isChecked} size="small" class="text-text-toolbar">
            <svelte:fragment slot="offLabel">Open in new tab</svelte:fragment>
        </Toggle>
    </Dropdown>
</div>
