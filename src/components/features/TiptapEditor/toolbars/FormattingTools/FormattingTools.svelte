<script>
    import cn from "classnames";
    import { Button, Dropdown, DropdownDivider, DropdownItem } from "flowbite-svelte";
    import FormattingParagraphIcon from "$components/assets/svg/editor/FormattingParagraphIcon.svelte";
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
    $: isActiveHeading4 = editor?.isActive("heading", { level: 4 });
    $: isActiveHeading5 = editor?.isActive("heading", { level: 5 });
    $: isActiveHeading6 = editor?.isActive("heading", { level: 6 });

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
    const onSetHeading4 = () => {
        editor?.chain().focus().setHeading({ level: 4 }).run();
        dropdownState = false;
    };
    const onSetHeading5 = () => {
        editor?.chain().focus().setHeading({ level: 5 }).run();
        dropdownState = false;
    };
    const onSetHeading6 = () => {
        editor?.chain().focus().setHeading({ level: 6 }).run();
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
    $: isDisabledParagraph = !editor?.can().chain().focus().setParagraph().run();
    $: isDisabledHeading1 = !editor?.can().chain().focus().setHeading({ level: 1 }).run();
    $: isDisabledHeading2 = !editor?.can().chain().focus().setHeading({ level: 2 }).run();
    $: isDisabledHeading3 = !editor?.can().chain().focus().setHeading({ level: 3 }).run();
    $: isDisabledHeading4 = !editor?.can().chain().focus().setHeading({ level: 4 }).run();
    $: isDisabledHeading5 = !editor?.can().chain().focus().setHeading({ level: 5 }).run();
    $: isDisabledHeading6 = !editor?.can().chain().focus().setHeading({ level: 6 }).run();
    $: isDisabledBulletList = !editor?.can().chain().focus().toggleBulletList().run();
    $: isDisabledSetOrderedList = !editor?.can().chain().focus().toggleOrderedList().run();
    $: isDisabledTaskList = !editor?.can().chain().focus().toggleTaskList().run();
</script>

<Button class="p-1 min-w-40 flex justify-start items-center gap-2 bg-background-toolbar hover:bg-background-toolbar-hovered text-text-toolbar text-left rounded-sm">
    {#if isActiveHeading1}
        <span class="w-4 text-text-toolbar">H1</span>
        <span class="flex-1">Heading 1</span>
    {:else if isActiveHeading2}
        <span class="w-4 text-text-toolbar">H2</span>
        <span class="flex-1">Heading 2</span>
    {:else if isActiveHeading3}
        <span class="w-4 text-text-toolbar">H3</span>
        <span class="flex-1">Heading 3</span>
    {:else if isActiveHeading4}
        <span class="w-4 text-text-toolbar">H4</span>
        <span class="flex-1">Heading 4</span>
    {:else if isActiveHeading5}
        <span class="w-4 text-text-toolbar">H5</span>
        <span class="flex-1">Heading 5</span>
    {:else if isActiveHeading6}
        <span class="w-4 text-text-toolbar">H6</span>
        <span class="flex-1">Heading 6</span>
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
    <DropdownItem class="py-1 flex justify-start items-center gap-2 hover:bg-background-toolbar-hovered" on:click={onSetParagraph}>
        <FormattingParagraphIcon width="16px" height="16px" className="fill-text-toolbar" />
        <span class="flex-1">Paragraph</span>
        <CheckIcon width="16px" height="16px" className={isActiveParagraph ? "fill-text-toolbar" : "fill-transparent"} />
    </DropdownItem>
    <DropdownItem class="py-1 flex justify-start items-center gap-2 hover:bg-background-toolbar-hovered" on:click={onSetHeading1}>
        <div class="w-4 text-text-toolbar">H1</div>
        <span class="flex-1">Heading 1</span>
        <CheckIcon width="16px" height="16px" className={isActiveHeading1 ? "fill-text-toolbar" : "fill-transparent"} />
    </DropdownItem>
    <DropdownItem class="py-1 flex justify-start items-center gap-2 hover:bg-background-toolbar-hovered" on:click={onSetHeading2}>
        <div class="w-4 text-text-toolbar">H2</div>
        <span class="flex-1">Heading 2</span>
        <CheckIcon width="16px" height="16px" className={isActiveHeading2 ? "fill-text-toolbar" : "fill-transparent"} />
    </DropdownItem>
    <DropdownItem class="py-1 flex justify-start items-center gap-2 hover:bg-background-toolbar-hovered" on:click={onSetHeading3}>
        <div class="w-4 text-text-toolbar">H3</div>
        <span class="flex-1">Heading 3</span>
        <CheckIcon width="16px" height="16px" className={isActiveHeading3 ? "fill-text-toolbar" : "fill-transparent"} />
    </DropdownItem>
    <DropdownItem class="py-1 flex justify-start items-center gap-2 hover:bg-background-toolbar-hovered" on:click={onSetHeading4}>
        <div class="w-4 text-text-toolbar">H4</div>
        <span class="flex-1">Heading 4</span>
        <CheckIcon width="16px" height="16px" className={isActiveHeading4 ? "fill-text-toolbar" : "fill-transparent"} />
    </DropdownItem>
    <DropdownItem class="py-1 flex justify-start items-center gap-2 hover:bg-background-toolbar-hovered" on:click={onSetHeading5}>
        <div class="w-4 text-text-toolbar">H5</div>
        <span class="flex-1">Heading 5</span>
        <CheckIcon width="16px" height="16px" className={isActiveHeading5 ? "fill-text-toolbar" : "fill-transparent"} />
    </DropdownItem>
    <DropdownItem class="py-1 flex justify-start items-center gap-2 hover:bg-background-toolbar-hovered" on:click={onSetHeading6}>
        <div class="w-4 text-text-toolbar">H6</div>
        <span class="flex-1">Heading 6</span>
        <CheckIcon width="16px" height="16px" className={isActiveHeading6 ? "fill-text-toolbar" : "fill-transparent"} />
    </DropdownItem>
    <DropdownDivider class="bg-border-toolbar" />
    <DropdownItem class="py-1 flex justify-start items-center gap-2 hover:bg-background-toolbar-hovered" on:click={onSetBulletList}>
        <UListIcon width="16px" height="16px" className="fill-text-toolbar" />
        <span class="flex-1">Bullet List</span>
        <CheckIcon width="16px" height="16px" className={isActiveBulletList ? "fill-text-toolbar" : "fill-transparent"} />
    </DropdownItem>
    <DropdownItem class="py-1 flex justify-start items-center gap-2 hover:bg-background-toolbar-hovered" on:click={onSetOrderedList}>
        <OListIcon width="16px" height="16px" className="fill-text-toolbar" />
        <span class="flex-1">Numbered List</span>
        <CheckIcon width="16px" height="16px" className={isActiveOrderedList ? "fill-text-toolbar" : "fill-transparent"} />
    </DropdownItem>
    <DropdownDivider class="bg-border-toolbar" />
    <DropdownItem class="py-1 flex justify-start items-center gap-2 hover:bg-background-toolbar-hovered" on:click={onSetTaskList}>
        <FormattingCheckListIcon width="16px" height="16px" className="fill-text-toolbar" />
        <span class="flex-1">Check List</span>
        <CheckIcon width="16px" height="16px" className={isActiveCheckList ? "fill-text-toolbar" : "fill-transparent"} />
    </DropdownItem>
</Dropdown>
