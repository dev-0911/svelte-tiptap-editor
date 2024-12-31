<script>
    import { v4 as uuid } from "uuid";
    import { BubbleMenuPlugin } from "@tiptap/extension-bubble-menu";
    import { onMount } from "svelte";
    import SharedBubbleMenu from "$components/shared/SharedBubbleMenu";
    import SharedBubbleMenuButton from "$components/shared/SharedBubbleMenuButton/SharedBubbleMenuButton.svelte";
    import getRenderContainer from "$components/features/TiptapEditor/utils/getRenderContainer";
    import { sticky } from "tippy.js";

    const pluginKey = `imageBlockMenu-${uuid()}`;

    export let editor;
    let element;
    let tippyInstance;

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
                placement: "top-start",
                popperOptions: {
                    modifiers: [{ name: "flip", enabled: false }],
                },
                appendTo: () => {
                    return document.getElementById("PORTAL-ROOT");
                },
                popperOptions: {
                    arrow: false,

                    offset: [0, 8],
                    popperOptions: {
                        modifiers: [{ name: "flip", enabled: false }],
                    },
                    getReferenceClientRect,
                    onCreate: (instance) => {
                        tippyInstance = instance;
                    },
                    appendTo: () => {
                        return appendTo?.current;
                    },
                    plugins: [sticky],
                    sticky: "popper",
                },
            },
            shouldShow: ({ view, state, from }) => {
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

    const onWidthChange = (value) => {
        editor.chain().focus(undefined, { scrollIntoView: false }).setImageBlockWidth(value).run();
    };

    $: currentValue = value;
    let value;

    const handleChange = (e) => {
        const nextValue = parseInt(e.target.value);
        // onChange(nextValue);
        currentValue = nextValue;
    };
    let isImageLeft = false;
    let isImageCenter = false;
    let isImageRight = false;
</script>

<div bind:this={element}>
    <SharedBubbleMenu>
        <SharedBubbleMenuButton tooltip="Align image left" active={isImageLeft} onClick={onAlignImageLeft}>left</SharedBubbleMenuButton>
        <SharedBubbleMenuButton tooltip="Align image center" active={isImageCenter} onClick={onAlignImageCenter}>center</SharedBubbleMenuButton>
        <SharedBubbleMenuButton tooltip="Align image right" active={isImageRight} onClick={onAlignImageRight}>right</SharedBubbleMenuButton>

        <div class="flex items-center gap-2">
            <input
                class="h-2 bg-neutral-200 border-0 rounded appearance-none fill-neutral-300"
                type="range"
                min="25"
                max="100"
                step="25"
                onChange={handleChange}
                value={currentValue} />
            <span class="text-xs font-semibold text-neutral-500 select-none">{value}%</span>
        </div>
    </SharedBubbleMenu>
</div>
