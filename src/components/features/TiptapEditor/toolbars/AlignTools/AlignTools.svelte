<script>
    import cn from "classnames";
    import AlignLeftIcon from "$components/assets/svg/editor/AlignLeftIcon.svelte";
    import AlignCenterIcon from "$components/assets/svg/editor/AlignCenterIcon.svelte";
    import AlignRightIcon from "$components/assets/svg/editor/AlignRightIcon.svelte";
    import AlignJustifyIcon from "$components/assets/svg/editor/AlignJustifyIcon.svelte";
    import SharedToolbarButton from "$components/shared/ShareToolbarButton/SharedToolbarButton.svelte";

    export let editor;

    $: isActivedLeft = editor?.isActive({ textAlign: "left" });
    $: isActivedCenter = editor?.isActive({ textAlign: "center" });
    $: isActivedRight = editor?.isActive({ textAlign: "right" });
    $: isActivedJustify = editor?.isActive({ textAlign: "justify" });

    $: isDisabledLeft = !editor.can().chain().focus().setTextAlign("left").run();
    $: isDisabledCenter = !editor.can().chain().focus().setTextAlign("center").run();
    $: isDisabledRight = !editor.can().chain().focus().setTextAlign("right").run();
    $: isDisabledJustify = !editor.can().chain().focus().setTextAlign("justify").run();

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
    <SharedToolbarButton onClick={handleAlignLeftClick} actived={isActivedLeft} disabled={isDisabledLeft}>
        <AlignLeftIcon
            width="18px"
            height="18px"
            className={cn("fill-text-toolbar", isActivedLeft && "fill-text-toolbar-selected", isDisabledLeft && "fill-text-toolbar-disabled")} />
    </SharedToolbarButton>

    <SharedToolbarButton onClick={handleAlignCenterClick} actived={isActivedCenter} disabled={isDisabledCenter}>
        <AlignCenterIcon
            width="18px"
            height="18px"
            className={cn("fill-text-toolbar", isActivedCenter && "fill-text-toolbar-selected", isDisabledCenter && "fill-text-toolbar-disabled")} />
    </SharedToolbarButton>

    <SharedToolbarButton onClick={handleAlignRightClick} actived={isActivedRight} disabled={isDisabledRight}>
        <AlignRightIcon
            width="18px"
            height="18px"
            className={cn("fill-text-toolbar", isActivedRight && "fill-text-toolbar-selected", isDisabledRight && "fill-text-toolbar-disabled")} />
    </SharedToolbarButton>

    <SharedToolbarButton onClick={handleAlignJustifyClick} actived={isActivedJustify} disabled={isDisabledJustify}>
        <AlignJustifyIcon
            width="18px"
            height="18px"
            className={cn("fill-text-toolbar", isActivedJustify && "fill-text-toolbar-selected", isDisabledJustify && "fill-text-toolbar-disabled")} />
    </SharedToolbarButton>
</div>
