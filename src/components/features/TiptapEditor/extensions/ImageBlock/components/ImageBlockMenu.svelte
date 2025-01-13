<script>
    import { v4 as uuid } from "uuid";
    import { onMount } from "svelte";
    import { BubbleMenuPlugin } from "@tiptap/extension-bubble-menu";

    import { Range } from "flowbite-svelte";

    import AlignLeftIcon from "$components/assets/svg/editor/AlignLeftIcon.svelte";
    import AlignRightIcon from "$components/assets/svg/editor/AlignRightIcon.svelte";
    import AlignCenterIcon from "$components/assets/svg/editor/AlignCenterIcon.svelte";
    import { BubbleMenuButton, BubbleMenuDivider } from "$components/shared/BubbleMenu";
    import { getRenderContainer } from "$components/shared/Svelte-tiptap";

    const { editor } = $props();

    let element;
    const pluginKey = `imageBlockMenu-${uuid()}`;

    const getReferenceClientRect = () => {
        const renderContainer = getRenderContainer(editor, "node-imageBlock");
        const rect = renderContainer?.getBoundingClientRect() || new DOMRect(-1000, -1000, 0, 0);

        return rect;
    };

    onMount(() => {
        const plugin = BubbleMenuPlugin({
            pluginKey,
            editor,
            element,
            tippyOptions: {
                theme: "bubble-menu",
                placement: "top",
                offset: [0, 8],
                arrow: false,
                popperOptions: {
                    modifiers: [{ name: "flip", enabled: false }],
                },

                appendTo: () => {
                    return document.getElementById("PORTAL-ROOT");
                },
                getReferenceClientRect,
            },
            shouldShow: ({ editor }) => {
                return editor.isActive("imageBlock");
            },
        });

        editor.registerPlugin(plugin);

        return () => editor.unregisterPlugin(pluginKey);
    });

    let initValue = $derived(parseInt(editor.getAttributes("imageBlock")?.width || 0));
    let value = $state(undefined);

    $effect(() => {
        value = initValue;
    });

    const onAlignImageLeft = () => {
        editor.chain().focus(undefined, { scrollIntoView: false }).setImageBlockAlign("left").run();
    };

    const onAlignImageCenter = () => {
        editor.chain().focus(undefined, { scrollIntoView: false }).setImageBlockAlign("center").run();
    };

    const onAlignImageRight = () => {
        editor.chain().focus(undefined, { scrollIntoView: false }).setImageBlockAlign("right").run();
    };

    const onWidthChange = (e) => {
        const nextValue = parseInt(e.target.value);
        editor.chain().focus(undefined, { scrollIntoView: false }).setImageBlockWidth(nextValue).run();
        value = nextValue;
    };

    let isImageLeft = $derived(editor.isActive("imageBlock", { align: "left" }));
    let isImageCenter = $derived(editor.isActive("imageBlock", { align: "center" }));
    let isImageRight = $derived(editor.isActive("imageBlock", { align: "right" }));
</script>

<div bind:this={element}>
    <div class="flex justify-start items-center gap-2">
        <BubbleMenuButton tooltip="Align image left" actived={isImageLeft} onclick={onAlignImageLeft}><AlignLeftIcon /></BubbleMenuButton>
        <BubbleMenuButton tooltip="Align image center" actived={isImageCenter} onclick={onAlignImageCenter}><AlignCenterIcon /></BubbleMenuButton>
        <BubbleMenuButton tooltip="Align image right" actived={isImageRight} onclick={onAlignImageRight}><AlignRightIcon /></BubbleMenuButton>
        <BubbleMenuDivider />
        <div class="flex items-center gap-2">
            <Range size="sm" min="25" max="100" step="0" bind:value onchange={onWidthChange} />
            <span>{initValue}%</span>
        </div>
    </div>
</div>
