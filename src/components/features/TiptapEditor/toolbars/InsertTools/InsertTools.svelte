<script>
    import CmdLinkIcon from "$components/assets/svg/editor/CmdLinkIcon.svelte";
    import { Dropdown, DropdownButton, DropdownInput, DropdownLabel } from "$components/shared/Dropdown";
    import { ToolbarButton } from "$components/shared/Toolbar";
    import { Button, Tooltip } from "flowbite-svelte";

    let { editor } = $props();

    let inputValue = $state("");
    let isValidUrl = $derived(/^(\S+):(\/\/)?\S+$/.test(inputValue));

    let linkDropdownOpen = $state(false);

    let canSetLink = $derived(editor?.can().chain().focus().setLink({ href: inputValue, target: "_blank" }).run());

    const handleSetClick = () => {
        editor.chain().focus().setLink({ href: inputValue, target: "_blank" }).run();
        linkDropdownOpen = false;
    };
</script>

<div class="flex justify-start items-center gap-1">
    <ToolbarButton disabled={!canSetLink}>
        <CmdLinkIcon width="18px" height="18px" />
    </ToolbarButton>

    <Dropdown placement="bottom-start" bind:open={linkDropdownOpen}>
        <div class="min-w-60">
            <div class="mb-2">
                <DropdownLabel>Page or Url</DropdownLabel>
            </div>

            <div class="mb-2">
                <DropdownInput type="url" placeholder="Enter URL" size="sm" bind:value={inputValue} />
            </div>

            <div class="flex items-center justify-end">
                <DropdownButton size="sm" disabled={!isValidUrl} onclick={handleSetClick}>Set</DropdownButton>
            </div>
        </div>
    </Dropdown>
</div>
<Tooltip>Hyperlink</Tooltip>
