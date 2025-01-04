<script>
    import cn from "classnames";
    import { Dropdown, DropdownDivider, DropdownItem, Tooltip } from "flowbite-svelte";
    import SharedToolbarButton from "$components/shared/SharedToolbarButton/SharedToolbarButton.svelte";
    import ChevronDownIcon from "$components/assets/svg/editor/ChevronDownIcon.svelte";
    import FontSizeIcon from "$components/assets/svg/editor/FontSizeIcon.svelte";
    import FontFamilyIcon from "$components/assets/svg/editor/FontFamilyIcon.svelte";
    import StyleHighlightIcon from "$components/assets/svg/editor/StyleHighlightIcon.svelte";
    import StyleEraserIcon from "$components/assets/svg/editor/StyleEraserIcon.svelte";
    import StyleFontColorIcon from "$components/assets/svg/editor/StyleFontColorIcon.svelte";
    import ColorItem from "$components/assets/svg/editor/ColorItem.svelte";

    import SharedBubbleMenuItem from "$components/shared/SharedBubbleMenuItem/SharedBubbleMenuItem.svelte";

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
            name: "Cursive",
            value: "cursive",
        },
        {
            name: "CSS variable",
            value: "var(--title-font-family)",
        },
        {
            name: "Comic Sans quoted",
            value: '"Comic Sans MS", "Comic Sans"',
        },
        {
            name: "Monospace",
            value: "monospace",
        },
        {
            name: "Exo 2",
            value: "Exo 2",
        },
    ];

    const fontSizes = [
        { name: "9", value: "9px" },
        { name: "10", value: "10px" },
        { name: "11", value: "11px" },
        { name: "12", value: "12px" },
        { name: "13", value: "13px" },
        { name: "14", value: "14px" },
        { name: "15", value: "15px" },
        { name: "16", value: "16px" },
        { name: "17", value: "17px" },
        { name: "18", value: "18px" },
        { name: "19", value: "19px" },
        { name: "20", value: "20px" },
        { name: "21", value: "21px" },
        { name: "22", value: "22px" },
    ];

    const fontColors = [
        { value: "#333333", name: "Charcoal" },
        { value: "#000080", name: "Navy Blue" },
        { value: "#2F4F4F", name: "Dark Slate Gray" },
        { value: "#6A0FAD", name: "Deep Purple" },
        { value: "#DC143C", name: "Crimson" },
        { value: "#008080", name: "Teal" },
        { value: "#556B2F", name: "Dark Olive Green" },
        { value: "#D2691E", name: "Chocolate" },
        { value: "#6A5ACD", name: "Slate Blue" },
        { value: "#B22222", name: "Firebrick" },
    ];

    const highlights = [
        { value: "#87CEEB", name: "Sky Blue " },
        { value: "#32CD32", name: "Lime Green " },
        { value: "#FF7F50", name: "Coral " },
        { value: "#FFFFE0", name: "Light Yellow " },
        { value: "#E6E6FA", name: "Lavender " },
        { value: "#FFDAB9", name: "Peach " },
        { value: "#98FF98", name: "Mint Green " },
        { value: "#FFB6C1", name: "Soft Pink " },
        { value: "#FFA07A", name: "Light Salmon " },
        { value: "#DAA520", name: "Goldenrod " },
    ];

    const { editor } = $props();

    let familyDropdownState = $state(false);
    let sizeDropdownState = $state(false);
    let highlightDropdownState = $state(false);
    let fontColorDropdownState = $state(false);

    let selectedFamily = $derived(fontFamilies?.find(({ value }) => editor?.isActive("textStyle", { fontFamily: value })));
    let selectedSize = $derived(fontSizes?.find(({ value }) => editor?.isActive("textStyle", { fontSize: value })));
    let selectedFontColor = $derived(fontColors?.find(({ value }) => editor?.isActive("textStyle", { color: value })));
    let selectedHighlight = $derived(highlights?.find(({ value }) => editor?.isActive("highlight", { color: value })));

    const onSetFamily = (value) => {
        editor?.chain()?.focus()?.setFontFamily(value).run();
        familyDropdownState = false;
    };

    const onSetSize = (value) => {
        editor?.chain()?.focus()?.setFontSize(value).run();
        sizeDropdownState = false;
    };

    const onSetFontColor = (value) => {
        editor?.chain()?.focus()?.setColor(value).run();
        fontColorDropdownState = false;
    };

    const onUnsetFontColor = () => {
        editor?.chain()?.focus()?.unsetColor().run();
        fontColorDropdownState = false;
    };

    const onSetHighlight = (value) => {
        editor?.chain()?.focus()?.setHighlight({ color: value }).run();
        highlightDropdownState = false;
    };

    const onUnsetHighlight = (value) => {
        editor?.chain()?.focus()?.unsetHighlight().run();
        highlightDropdownState = false;
    };
</script>

<div class="flex justify-start items-center gap-1">
    <div class="flex-0">
        <SharedToolbarButton className="w-44 text-left text-text-toolbar">
            <div class="w-full flex items-center justify-start gap-1">
                <div class="flex-0">
                    <FontFamilyIcon className="fill-text-toolbar" />
                </div>
                <span class="flex-1">{selectedFamily?.name || "Default"}</span>
                <div class="flex-0">
                    <ChevronDownIcon className="fill-text-toolbar" />
                </div>
            </div>
        </SharedToolbarButton>

        <Dropdown placement="bottom-start" class="w-44  bg-background-toolbar text-text-toolbar border border-border-toolbar rounded-sm" open={familyDropdownState}>
            {#each fontFamilies as fontFamily}
                <DropdownItem
                    class={cn(
                        "flex justify-start items-center gap-2 hover:bg-background-toolbar-hovered",
                        selectedFamily?.value === fontFamily.value ? "bg-background-toolbar-focused" : "bg-background-toolbar",
                    )}
                    on:click={() => onSetFamily(fontFamily.value)}>
                    <span class="flex-1">{fontFamily.name}</span>
                </DropdownItem>
            {/each}
        </Dropdown>
    </div>
    <Tooltip>Font family</Tooltip>

    <div class="flex-0">
        <SharedToolbarButton className="w-12 text-text-toolbar" actived={!!selectedSize}>
            <div class="w-full flex items-center justify-start gap-1">
                <div class="flex-0">
                    <FontSizeIcon className="fill-text-toolbar" />
                </div>
                <!-- {#if selectedSize}
                    <span class="flex-1">{selectedSize?.name}</span>
                {/if} -->
                <div class="flex-0">
                    <ChevronDownIcon className="fill-text-toolbar" />
                </div>
            </div>
        </SharedToolbarButton>
        <Dropdown placement="bottom-start" class="w-12 bg-background-toolbar text-text-toolbar border border-border-toolbar rounded-sm" bind:open={sizeDropdownState}>
            {#each fontSizes as fontsize}
                <DropdownItem
                    class={cn(
                        "px-3 py-1 flex justify-center items-center gap-1 hover:bg-background-toolbar-hovered",
                        selectedSize?.value === fontsize.value ? "bg-background-toolbar-focused" : "bg-background-toolbar",
                    )}
                    on:click={() => onSetSize(fontsize.value)}>
                    <span>{fontsize.name}</span>
                </DropdownItem>
            {/each}
        </Dropdown>
    </div>
    <Tooltip>Font size</Tooltip>

    <div>
        <SharedToolbarButton className="w-12" actived={!!selectedFontColor}>
            <div class="w-full flex items-center justify-start gap-1">
                <div class="flex-0">
                    <StyleFontColorIcon color={selectedFontColor && selectedFontColor.value} className={!selectedFontColor && "fill-text-toolbar"} secondColor="#6d868a" />
                </div>
                <div class="flex-0">
                    <ChevronDownIcon className="fill-text-toolbar" />
                </div>
            </div>
        </SharedToolbarButton>

        <Dropdown placement="bottom-start" class="w-full bg-background-toolbar text-text-toolbar border border-border-toolbar rounded-sm" bind:open={fontColorDropdownState}>
            {#each fontColors as fontColor}
                <DropdownItem
                    class={cn(
                        "px-3 py-1 flex justify-start items-center gap-1 hover:bg-background-toolbar-hovered",
                        selectedFontColor?.value === fontColor.value ? "bg-background-toolbar-focused" : "bg-background-toolbar",
                    )}
                    on:click={() => onSetFontColor(fontColor.value)}>
                    <ColorItem width="20px" height="20px" color={fontColor.value} />
                </DropdownItem>
            {/each}
            <DropdownDivider class="m-0 bg-border-toolbar" />
            <DropdownItem
                class="px-3 py-1 flex justify-start items-center gap-1 hover:bg-background-toolbar-hovered"
                disabled={!editor?.isActive("highlight")}
                on:click={onUnsetFontColor}>
                <StyleEraserIcon width="20px" height="20px" className="fill-text-toolbar" />
            </DropdownItem>
        </Dropdown>
    </div>
    <Tooltip>Font color</Tooltip>

    <div>
        <SharedToolbarButton className="w-12" actived={!!selectedHighlight}>
            <div class="w-full flex items-center justify-start gap-1">
                <div class="flex-0">
                    <StyleHighlightIcon color={selectedHighlight && selectedHighlight.value} className={!selectedHighlight && "fill-text-toolbar"} secondColor="#6d868a" />
                </div>
                <div class="flex-0">
                    <ChevronDownIcon className="fill-text-toolbar" />
                </div>
            </div>
        </SharedToolbarButton>

        <Dropdown placement="bottom-start" class="w-12 bg-background-toolbar text-text-toolbar border border-border-toolbar rounded-sm" bind:open={highlightDropdownState}>
            {#each highlights as highlight}
                <DropdownItem
                    class={cn(
                        "px-3 py-1 flex justify-start items-center gap-1 hover:bg-background-toolbar-hovered",
                        selectedHighlight?.value === highlight.value ? "bg-background-toolbar-focused" : "bg-background-toolbar",
                    )}
                    on:click={() => onSetHighlight(highlight.value)}>
                    <ColorItem color={highlight.value} />
                </DropdownItem>
            {/each}
            <DropdownDivider class="m-0 bg-border-toolbar" />
            <DropdownItem
                class="px-3 py-1 flex justify-start items-center gap-1 hover:bg-background-toolbar-hovered"
                disabled={!editor?.isActive("highlight")}
                on:click={() => onUnsetHighlight()}>
                <StyleEraserIcon className="fill-text-toolbar" />
            </DropdownItem>
        </Dropdown>
    </div>
    <Tooltip>Highlight</Tooltip>
</div>
