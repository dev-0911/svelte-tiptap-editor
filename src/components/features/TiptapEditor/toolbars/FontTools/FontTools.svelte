<script>
    import cn from "classnames";
    import { Dropdown, DropdownDivider, DropdownItem, Tooltip } from "flowbite-svelte";
    import SharedToolbarButton from "$components/shared/SharedToolbarButton/SharedToolbarButton.svelte";
    import ChevronDownIcon from "$components/assets/svg/editor/ChevronDownIcon.svelte";
    // import FontSizeIcon from "$components/assets/svg/editor/FontSizeIcon.svelte";
    import FontFamilyIcon from "$components/assets/svg/editor/FontFamilyIcon.svelte";
    import StyleHighlightIcon from "$components/assets/svg/editor/StyleHighlightIcon.svelte";
    import StyleEraserIcon from "$components/assets/svg/editor/StyleEraserIcon.svelte";
    import StyleFontColorIcon from "$components/assets/svg/editor/StyleFontColorIcon.svelte";
    import ColorItem from "$components/assets/svg/editor/ColorItem.svelte";
    import { fontColors, fontFamilies, fontSizes, highlights } from "./constant";
    import MinusIcon from "$components/assets/svg/editor/MinusIcon.svelte";
    import PlusIcon from "$components/assets/svg/editor/PlusIcon.svelte";

    const { editor } = $props();

    let familyDropdownState = $state(false);
    let sizeDropdownState = $state(false);
    let highlightDropdownState = $state(false);
    let fontColorDropdownState = $state(false);

    let isActiveHeading1 = $derived(editor?.isActive("heading", { level: 1 }));
    let isActiveHeading2 = $derived(editor?.isActive("heading", { level: 2 }));
    let isActiveHeading3 = $derived(editor?.isActive("heading", { level: 3 }));
    let isActiveHeading4 = $derived(editor?.isActive("heading", { level: 4 }));
    let isActiveHeading5 = $derived(editor?.isActive("heading", { level: 5 }));
    let isActiveHeading6 = $derived(editor?.isActive("heading", { level: 6 }));

    let selectedFamily = $derived(fontFamilies?.find(({ value }) => editor?.isActive("textStyle", { fontFamily: value })));
    let selectedSize = $state(null);

    $effect(() => {
        const fontsize = fontSizes?.find(({ value }) => editor?.isActive("textStyle", { fontSize: value }));
        if (fontsize) {
            selectedSize = fontsize;
            return;
        }
        console.log(fontsize);
        if (isActiveHeading1) {
            selectedSize = fontSizes?.find(({ value }) => value === "30px");
            return;
        }
        if (isActiveHeading2) {
            selectedSize = fontSizes?.find(({ value }) => value === "24px");
            return;
        }
        if (isActiveHeading3) {
            selectedSize = fontSizes?.find(({ value }) => value === "20px");
            return;
        }
        if (isActiveHeading4) {
            selectedSize = fontSizes?.find(({ value }) => value === "18px");
            return;
        }
        if (isActiveHeading5) {
            selectedSize = fontSizes?.find(({ value }) => value === "16px");
            return;
        }
        if (isActiveHeading6) {
            selectedSize = fontSizes?.find(({ value }) => value === "14px");
            return;
        }
        selectedSize = fontSizes?.find(({ value }) => value === "16px");
        return;
    });

    let selectedFontColor = $derived(fontColors?.find(({ value }) => editor?.isActive("textStyle", { color: value })));
    let selectedHighlight = $derived(highlights?.find(({ value }) => editor?.isActive("highlight", { color: value })));

    const onSetFamily = (value) => {
        editor?.chain()?.focus()?.setFontFamily(value).run();
        familyDropdownState = false;
    };

    const fontValues = fontSizes.map(({ value }) => {
        return value;
    });

    const onSetSize = (value) => {
        editor?.chain()?.focus()?.setFontSize(value).run();
        sizeDropdownState = false;
    };

    const onMinusSize = () => {
        if (!selectedSize) return;
        const index = fontValues.indexOf(selectedSize.value);

        if (index > 0) {
            const value = fontSizes[index - 1].value;
            editor?.chain()?.focus()?.setFontSize(value).run();
        }
    };

    const onPlusSize = () => {
        if (!selectedSize) return;
        const index = fontValues.indexOf(selectedSize.value);

        if (index < fontSizes.length - 1) {
            const value = fontSizes[index + 1].value;
            editor?.chain()?.focus()?.setFontSize(value).run();
        }
    };

    const onSetFontColor = (value) => {
        editor?.chain()?.focus()?.setColor(value).run();
        fontColorDropdownState = false;
    };

    const onUnsetFontColor = () => {
        console.log("Unset Font Color");
        editor?.chain()?.focus()?.unsetColor().run();

        fontColorDropdownState = false;
    };

    const onSetHighlight = (value) => {
        editor?.chain()?.focus()?.setHighlight({ color: value }).run();
        highlightDropdownState = false;
    };

    const onUnsetHighlight = () => {
        console.log("Unset Highlight Color");
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

        <Dropdown placement="bottom-start" class="w-44  bg-background-toolbar text-text-toolbar border border-border-toolbar rounded-sm" bind:open={familyDropdownState}>
            {#each fontFamilies as fontFamily}
                <DropdownItem
                    class={cn(
                        "flex justify-start items-center gap-2 hover:bg-background-toolbar-hovered",
                        selectedFamily?.value === fontFamily.value ? "bg-background-toolbar-focused" : "bg-background-toolbar",
                    )}
                    onclick={() => onSetFamily(fontFamily.value)}>
                    <span class="flex-1">{fontFamily.name}</span>
                </DropdownItem>
            {/each}
        </Dropdown>
    </div>
    <Tooltip>Font family</Tooltip>

    <div class="flex-0">
        <div class="flex justify-start items-center gap-2">
            <SharedToolbarButton onclick={onMinusSize}>
                <MinusIcon width="14px" height="14px" />
            </SharedToolbarButton>
            {#if selectedSize}
                <span class="flex-1 text-sm">{selectedSize?.name}</span>
            {/if}
            <SharedToolbarButton onclick={onPlusSize}>
                <PlusIcon width="14px" height="14px" />
            </SharedToolbarButton>
        </div>
        <!-- <SharedToolbarButton className="w-12 text-text-toolbar" actived={!!selectedSize}>
            <div class="w-full flex items-center justify-start gap-1">
                <div class="flex-0">
                    <FontSizeIcon className="fill-text-toolbar" />
                </div>
                {#if selectedSize}
                    <span class="flex-1">{selectedSize?.name}</span>
                {/if}
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
                    onclick={() => onSetSize(fontsize.value)}>
                    <span>{fontsize.name}</span>
                </DropdownItem>
            {/each}
        </Dropdown> -->
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
                    onclick={() => onSetFontColor(fontColor.value)}>
                    <ColorItem width="20px" height="20px" color={fontColor.value} />
                </DropdownItem>
            {/each}
            <DropdownDivider class="m-0 bg-border-toolbar" />
            <DropdownItem
                class="px-3 py-1 flex justify-start items-center gap-1 hover:bg-background-toolbar-hovered"
                disabled={!editor?.isActive("textStyle")}
                onclick={onUnsetFontColor}>
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
                    onclick={() => onSetHighlight(highlight.value)}>
                    <ColorItem color={highlight.value} />
                </DropdownItem>
            {/each}
            <DropdownDivider class="m-0 bg-border-toolbar" />
            <DropdownItem
                class="px-3 py-1 flex justify-start items-center gap-1 hover:bg-background-toolbar-hovered"
                disabled={!editor?.isActive("highlight")}
                onclick={onUnsetHighlight}>
                <StyleEraserIcon className="fill-text-toolbar" />
            </DropdownItem>
        </Dropdown>
    </div>
    <Tooltip>Highlight</Tooltip>
</div>
