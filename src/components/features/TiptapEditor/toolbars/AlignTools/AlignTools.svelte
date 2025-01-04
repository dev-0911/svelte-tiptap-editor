<script>
    import cn from "classnames";
    import AlignLeftIcon from "$components/assets/svg/editor/AlignLeftIcon.svelte";
    import AlignCenterIcon from "$components/assets/svg/editor/AlignCenterIcon.svelte";
    import AlignRightIcon from "$components/assets/svg/editor/AlignRightIcon.svelte";
    import AlignJustifyIcon from "$components/assets/svg/editor/AlignJustifyIcon.svelte";
    import SharedToolbarButton from "$components/shared/SharedToolbarButton/SharedToolbarButton.svelte";

    const { editor } = $props();

    let isActivedLeft = $derived(editor?.isActive({ textAlign: "left" }));
    let isActivedCenter = $derived(editor?.isActive({ textAlign: "center" }));
    let isActivedRight = $derived(editor?.isActive({ textAlign: "right" }));
    let isActivedJustify = $derived(editor?.isActive({ textAlign: "justify" }));

    let isDisabledLeft = $derived(!editor.can().chain().focus().setTextAlign("left").run());
    let isDisabledCenter = $derived(!editor.can().chain().focus().setTextAlign("center").run());
    let isDisabledRight = $derived(!editor.can().chain().focus().setTextAlign("right").run());
    let isDisabledJustify = $derived(!editor.can().chain().focus().setTextAlign("justify").run());

    const handleAlignLeftClick = () => {
        editor.chain().focus().setTextAlign("left").run();
    };

    const handleAlignCenterClick = () => {
        editor.chain().focus().setTextAlign("center").run();
    };

    const handleAlignRightClick = () => {
        editor.chain().focus().setTextAlign("right").run();
    };

    const handleAlignJustifyClick = () => {
        editor.chain().focus().setTextAlign("justify").run();
    };
</script>

<div class="flex justify-start items-center gap-1">
    <SharedToolbarButton hint="Align left" onclick={handleAlignLeftClick} actived={isActivedLeft} disabled={isDisabledLeft}>
        <AlignLeftIcon className={cn("fill-text-toolbar", isActivedLeft && "fill-text-toolbar-selected", isDisabledLeft && "fill-text-toolbar-disabled")} />
    </SharedToolbarButton>

    <SharedToolbarButton hint="Align center" onclick={handleAlignCenterClick} actived={isActivedCenter} disabled={isDisabledCenter}>
        <AlignCenterIcon className={cn("fill-text-toolbar", isActivedCenter && "fill-text-toolbar-selected", isDisabledCenter && "fill-text-toolbar-disabled")} />
    </SharedToolbarButton>

    <SharedToolbarButton hint="Align right" onclick={handleAlignRightClick} actived={isActivedRight} disabled={isDisabledRight}>
        <AlignRightIcon className={cn("fill-text-toolbar", isActivedRight && "fill-text-toolbar-selected", isDisabledRight && "fill-text-toolbar-disabled")} />
    </SharedToolbarButton>

    <SharedToolbarButton hint="Aling justify" onclick={handleAlignJustifyClick} actived={isActivedJustify} disabled={isDisabledJustify}>
        <AlignJustifyIcon className={cn("fill-text-toolbar", isActivedJustify && "fill-text-toolbar-selected", isDisabledJustify && "fill-text-toolbar-disabled")} />
    </SharedToolbarButton>
</div>
