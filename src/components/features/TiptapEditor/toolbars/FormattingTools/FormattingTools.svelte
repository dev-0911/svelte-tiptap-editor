<script>
    import { Button, Dropdown, DropdownDivider, DropdownItem } from "flowbite-svelte";
    import FormattingParagraphIcon from "$components/assets/svg/editor/FormattingParagraphIcon.svelte";
    import FormattingH1Icon from "$components/assets/svg/editor/FormattingH1Icon.svelte";
    import FormattingH2Icon from "$components/assets/svg/editor/FormattingH2Icon.svelte";
    import FormattingH3Icon from "$components/assets/svg/editor/FormattingH3Icon.svelte";
    import UListIcon from "$components/assets/svg/editor/UListIcon.svelte";
    import OListIcon from "$components/assets/svg/editor/OListIcon.svelte";
    import FormattingCheckListIcon from "$components/assets/svg/editor/FormattingCheckListIcon.svelte";
    import CheckIcon from "$components/assets/svg/editor/CheckIcon.svelte";
    import ChevronDownIcon from "$components/assets/svg/editor/ChevronDownIcon.svelte";
    export let editor;

    let dropdownState = false;

    $: isActiveHeading1 = editor?.isActive("heading", { level: 1 });
    $: isActiveHeading2 = editor?.isActive("heading", { level: 2 });
    $: isActiveHeading3 = editor?.isActive("heading", { level: 3 });
    $: isActiveBulletList = editor?.isActive("bulletList");
    $: isActiveOrderedList = editor?.isActive("orderedList");
    $: isActiveCheckList = editor?.isActive("taskList");
    $: isActiveParagraph = editor?.isActive("paragraph") && !isActiveBulletList && !isActiveOrderedList && !isActiveCheckList;

    const onSetParagraph = () => {
        editor?.chain().focus().setParagraph().run();
        dropdownState = false;
    };
    const onSetHeading1 = () => {
        editor?.chain().focus().setHeading({ level: 1 }).run();
        dropdownState = false;
    };
    const onSetHeading2 = () => {
        editor?.chain().focus().setHeading({ level: 2 }).run();
        dropdownState = false;
    };
    const onSetHeading3 = () => {
        editor?.chain().focus().setHeading({ level: 3 }).run();
        dropdownState = false;
    };
    const onSetBulletList = () => {
        editor?.chain().focus().toggleBulletList().run();
        dropdownState = false;
    };
    const onSetOrderedList = () => {
        editor?.chain().focus().toggleOrderedList().run();
        dropdownState = false;
    };
    const onSetTaskList = () => {
        editor.chain().focus().toggleTaskList().run();
        dropdownState = false;
    };
</script>

<Button class="p-1 min-w-40 flex justify-start items-center gap-2 bg-background-toolbar hover:bg-background-toolbar-hovered text-text-toolbar text-left rounded-sm">
    {#if isActiveHeading1}
        <FormattingH1Icon width="16px" height="16px" className="fill-text-toolbar" />
        <span class="flex-1">Heading 1</span>
    {:else if isActiveHeading2}
        <FormattingH2Icon width="16px" height="16px" className="fill-text-toolbar" />
        <span class="flex-1">Heading 2</span>
    {:else if isActiveHeading3}
        <FormattingH3Icon width="16px" height="16px" className="fill-text-toolbar" />
        <span class="flex-1">Heading 3</span>
    {:else if isActiveBulletList}
        <UListIcon width="16px" height="16px" className="fill-text-toolbar" />
        <span class="flex-1">Bullet List</span>
    {:else if isActiveOrderedList}
        <OListIcon width="16px" height="16px" className="fill-text-toolbar" />
        <span class="flex-1">Numbered List</span>
    {:else if isActiveCheckList}
        <FormattingCheckListIcon width="16px" height="16px" className="fill-text-toolbar" />
        <span class="flex-1">Check List</span>
    {:else}
        <FormattingParagraphIcon width="16px" height="16px" className="fill-text-toolbar" />
        <span class="flex-1">Paragraph</span>
    {/if}
    <ChevronDownIcon width="16px" height="16px" className="fill-text-toolbar" />
</Button>
<Dropdown placement="bottom-start" class="bg-background-toolbar text-text-toolbar border border-border-toolbar rounded-sm" bind:open={dropdownState}>
    <DropdownItem class="flex justify-start items-center gap-2 hover:bg-background-toolbar-hovered" on:click={onSetParagraph}>
        <FormattingParagraphIcon width="16px" height="16px" className="fill-text-toolbar" />
        <span class="flex-1">Paragraph</span>
        <CheckIcon width="16px" height="16px" className={isActiveParagraph ? "fill-text-toolbar" : "fill-transparent"} />
    </DropdownItem>
    <DropdownItem class="flex justify-start items-center gap-2 hover:bg-background-toolbar-hovered" on:click={onSetHeading1}>
        <FormattingH1Icon width="16px" height="16px" className="fill-text-toolbar" />
        <span class="flex-1">Heading 1</span>
        <CheckIcon width="16px" height="16px" className={isActiveHeading1 ? "fill-text-toolbar" : "fill-transparent"} />
    </DropdownItem>
    <DropdownItem class="flex justify-start items-center gap-2 hover:bg-background-toolbar-hovered" on:click={onSetHeading2}>
        <FormattingH2Icon width="16px" height="16px" className="fill-text-toolbar" />
        <span class="flex-1">Heading 2</span>
        <CheckIcon width="16px" height="16px" className={isActiveHeading2 ? "fill-text-toolbar" : "fill-transparent"} />
    </DropdownItem>
    <DropdownItem class="flex justify-start items-center gap-2 hover:bg-background-toolbar-hovered" on:click={onSetHeading3}>
        <FormattingH3Icon width="16px" height="16px" className="fill-text-toolbar" />
        <span class="flex-1">Heading 3</span>
        <CheckIcon width="16px" height="16px" className={isActiveHeading3 ? "fill-text-toolbar" : "fill-transparent"} />
    </DropdownItem>
    <DropdownDivider class="bg-border-toolbar" />
    <DropdownItem class="flex justify-start items-center gap-2 hover:bg-background-toolbar-hovered" on:click={onSetBulletList}>
        <UListIcon width="16px" height="16px" className="fill-text-toolbar" />
        <span class="flex-1">Bullet List</span>
        <CheckIcon width="16px" height="16px" className={isActiveBulletList ? "fill-text-toolbar" : "fill-transparent"} />
    </DropdownItem>
    <DropdownItem class="flex justify-start items-center gap-2 hover:bg-background-toolbar-hovered" on:click={onSetOrderedList}>
        <OListIcon width="16px" height="16px" className="fill-text-toolbar" />
        <span class="flex-1">Numbered List</span>
        <CheckIcon width="16px" height="16px" className={isActiveOrderedList ? "fill-text-toolbar" : "fill-transparent"} />
    </DropdownItem>
    <DropdownDivider class="bg-border-toolbar" />
    <DropdownItem class="flex justify-start items-center gap-2 hover:bg-background-toolbar-hovered" on:click={onSetTaskList}>
        <FormattingCheckListIcon width="16px" height="16px" className="fill-text-toolbar" />
        <span class="flex-1">Check List</span>
        <CheckIcon width="16px" height="16px" className={isActiveCheckList ? "fill-text-toolbar" : "fill-transparent"} />
    </DropdownItem>
</Dropdown>
