<script>
    import AlignLeftIcon from "$components/assets/svg/editor/AlignLeftIcon.svelte";
    import AlignCenterIcon from "$components/assets/svg/editor/AlignCenterIcon.svelte";
    import AlignRightIcon from "$components/assets/svg/editor/AlignRightIcon.svelte";
    import { Button } from "flowbite-svelte";

    export let editor;

    $: isActivedLeft = editor?.isActive({ textAlign: "left" });
    $: isActivedCenter = editor?.isActive({ textAlign: "center" });
    $: isActivedRight = editor?.isActive({ textAlign: "right" });

    const handleAlignLeftClick = () => {
        editor.chain().focus().setTextAlign("left").run();
    };

    const handleAlignCenterClick = () => {
        editor.chain().focus().setTextAlign("center").run();
    };

    const handleAlignRightClick = (ev) => {
        editor.chain().focus().setTextAlign("right").run();
    };
</script>

<div class="flex justify-start items-center gap-1">
    <Button class="p-1 bg-background-toolbar hover:bg-background-toolbar-hovered rounded-sm" on:click={handleAlignLeftClick}>
        <AlignLeftIcon width="18px" height="18px" className={!isActivedLeft ? "fill-text-toolbar" : "fill-text-toolbar-selected"} />
    </Button>
    <Button class="p-1 bg-background-toolbar hover:bg-background-toolbar-hovered rounded-sm" on:click={handleAlignCenterClick}>
        <AlignCenterIcon width="18px" height="18px" className={!isActivedCenter ? "fill-text-toolbar" : "fill-text-toolbar-selected"} />
    </Button>
    <Button class="p-1 bg-background-toolbar hover:bg-background-toolbar-hovered rounded-sm" on:click={handleAlignRightClick}>
        <AlignRightIcon width="18px" height="18px" className={!isActivedRight ? "fill-text-toolbar" : "fill-text-toolbar-selected"} />
    </Button>
</div>
