<script>
    import { v4 as uuid } from "uuid";
    import { BubbleMenuPlugin } from "@tiptap/extension-bubble-menu";
    import { onMount } from "svelte";
    import SharedBubbleMenu from "$components/shared/SharedBubbleMenu";
    import SharedBubbleMenuButton from "$components/shared/SharedBubbleMenuButton";
    import getRenderContainer from "$components/features/TiptapEditor/utils/getRenderContainer";
    import { sticky } from "tippy.js";
    import { isActive } from "@tiptap/core";
    import AlignLeftIcon from "$components/assets/svg/editor/AlignLeftIcon.svelte";
    import AlignRightIcon from "$components/assets/svg/editor/AlignRightIcon.svelte";
    import AlignCenterIcon from "$components/assets/svg/editor/AlignCenterIcon.svelte";
    import { Range } from "flowbite-svelte";
    import Divider from "$components/shared/Divider/Divider.svelte";

    const pluginKey = `imageBlockMenu-${uuid()}`;
    const { editor } = $props();
    let element;

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
                offset: [0, 8],
                placement: "top",
                arrow: true,
                appendTo: () => {
                    return document.body;
                },
                popperOptions: {
                    modifiers: [{ name: "flip", enabled: false }],
                },
                getReferenceClientRect,
                // onCreate: (instance) => {
                //     tippyInstance = instance;
                // },
                // onHidden: () => {
                //     showEdit = false;
                // },
                plugins: [sticky],
                sticky: "popper",
            },
            shouldShow: ({ editor }) => {
                const isActive = editor.isActive("imageBlock");

                return isActive;
            },
        });

        editor.registerPlugin(plugin);

        return () => editor.unregisterPlugin(pluginKey);
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

    let value = $state(100);

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
    <SharedBubbleMenu>
        <div class="flex items-center gap-2">
            <SharedBubbleMenuButton hint="Align image left" actived={true} onClick={onAlignImageLeft}><AlignLeftIcon /></SharedBubbleMenuButton>
            <SharedBubbleMenuButton hint="Align image center" actived={isImageCenter} onClick={onAlignImageCenter}><AlignCenterIcon /></SharedBubbleMenuButton>
            <SharedBubbleMenuButton hint="Align image right" actived={isImageRight} onClick={onAlignImageRight}><AlignRightIcon /></SharedBubbleMenuButton>
            <Divider />
            <div class="flex items-center gap-2">
                <Range id="range-minmax" min="20" max="100" step="5" bind:value onchange={onWidthChange} />

                <span class="text-xs font-semibold text-neutral-500 select-none">{value}%</span>
            </div>
        </div>
    </SharedBubbleMenu>
</div>
