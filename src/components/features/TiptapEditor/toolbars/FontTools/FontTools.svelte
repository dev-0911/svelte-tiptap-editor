<script>
    import { Button, Dropdown, DropdownDivider, DropdownItem } from "flowbite-svelte";
    import FormattingParagraphIcon from "$components/assets/svg/editor/FormattingParagraphIcon.svelte";
    import CheckIcon from "$components/assets/svg/editor/CheckIcon.svelte";
    import ChevronDownIcon from "$components/assets/svg/editor/ChevronDownIcon.svelte";
    import FontSizeIcon from "$components/assets/svg/editor/FontSizeIcon.svelte";
    import FontFamilyIcon from "$components/assets/svg/editor/FontFamilyIcon.svelte";

    export let editor;

    let familyDropdownState = false;
    let sizeDropdownState = false;

    const fontFamilies = [
        {
            name: "Inter",
            value: "Inter",
        },
        {
            name: "Comic Sans",
            value: "Comic Sans MS, Comic Sans",
        },
        {
            name: "Serif",
            value: "serif",
        },
        {
            name: "Monospace",
            value: "monospace",
        },
        {
            name: "Cursive",
            value: "cursive",
        },
    ];

    const fontSizes = [
        { name: "10", value: "10pt" },
        { name: "12", value: "12pt" },
        { name: "14", value: "14pt" },
        { name: "16", value: "16pt" },
        { name: "18", value: "18pt" },
        { name: "20", value: "20pt" },
        { name: "22", value: "22pt" },
    ];

    $: selectedFamily = fontFamilies?.find(({ value }) => editor?.isActive("textStyle", { fontFamily: value }));
    $: selectedSize = fontSizes?.find(({ value }) => editor?.isActive("textStyle", { fontSize: value }));

    const onSetFamily = (value) => {
        editor?.chain()?.focus()?.setFontFamily(value).run();
        familyDropdownState = false;
    };

    const onSetSize = (value) => {
        editor?.chain()?.focus()?.setFontSize(value).run();
        sizeDropdownState = false;
    };
</script>

<div class="min-w-32">
    <Button class="p-1 w-full flex justify-start items-center gap-2 bg-background-toolbar hover:bg-background-toolbar-hovered text-text-toolbar text-left rounded-sm">
        <FontFamilyIcon width="16px" height="16px" className="fill-text-toolbar" />
        <span class="flex-1">{selectedFamily?.name || "Default"}</span>
        <ChevronDownIcon width="16px" height="16px" className="fill-text-toolbar" />
    </Button>
    <Dropdown placement="bottom-start" class="w-full bg-background-toolbar text-text-toolbar border border-border-toolbar rounded-sm" bind:open={familyDropdownState}>
        {#each fontFamilies as fontFamily}
            <DropdownItem class="flex justify-start items-center gap-2 hover:bg-background-toolbar-hovered" on:click={() => onSetFamily(fontFamily.value)}>
                <span class="flex-1">{fontFamily.name}</span>
                <CheckIcon width="16px" height="16px" className={selectedFamily?.value === fontFamily.value ? "fill-text-toolbar" : "fill-transparent"} />
            </DropdownItem>
        {/each}
    </Dropdown>
</div>

<div class="min-w-10">
    <Button class="p-1 min-w-10 w-full flex justify-start items-center gap-2 bg-background-toolbar hover:bg-background-toolbar-hovered text-text-toolbar text-left rounded-sm">
        <FontSizeIcon width="16px" height="16px" className="fill-text-toolbar" />
        <span class="flex-1">{selectedSize?.name}</span>
        <ChevronDownIcon width="16px" height="16px" className="fill-text-toolbar" />
    </Button>
    <Dropdown placement="bottom-start" class="w-full bg-background-toolbar text-text-toolbar border border-border-toolbar rounded-sm" bind:open={sizeDropdownState}>
        {#each fontSizes as fontsize}
            <DropdownItem class="flex justify-start items-center gap-2 hover:bg-background-toolbar-hovered" on:click={() => onSetSize(fontsize.value)}>
                <span class="flex-1">{fontsize.name}</span>
                <CheckIcon width="16px" height="16px" className={selectedSize?.value === fontsize.value ? "fill-text-toolbar" : "fill-transparent"} />
            </DropdownItem>
        {/each}
    </Dropdown>
</div>
