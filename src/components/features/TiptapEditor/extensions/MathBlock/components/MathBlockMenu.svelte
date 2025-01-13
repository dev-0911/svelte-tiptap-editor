<script>
    import katex from "katex";
    import { v4 as uuid } from "uuid";
    import { onMount } from "svelte";
    import { BubbleMenuPlugin } from "@tiptap/extension-bubble-menu";

    import { BubbleMenuButton, BubbleMenuTextArea } from "$components/shared/BubbleMenu";
    import { getRenderContainer } from "$components/shared/Svelte-tiptap";

    let { editor } = $props();

    let element;
    const pluginKey = `mathBlockMenu-${uuid()}`;

    const getReferenceClientRect = () => {
        const renderContainer = getRenderContainer(editor, "node-mathBlock");
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
                placement: "bottom",
                maxWidth: "450px",
                offset: [0, 0],
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
                return editor.isActive("mathBlock");
            },
        });

        editor.registerPlugin(plugin);

        return () => editor.unregisterPlugin(pluginKey);
    });

    let defaultValue = $derived(editor.getAttributes("mathBlock")?.katex || "");
    let value = $state("");
    let html = $state("");
    let message = $state("");

    $effect(() => {
        value = defaultValue;
    });

    $effect(() => {
        try {
            html = katex.renderToString(value, { output: "html" });
            message = "";
        } catch (error) {
            message = "Invalid Katex";
        }
    });

    const handleDone = () => {
        editor.chain().focus(undefined, { scrollIntoView: false }).setMathContent({ katex: value, content: html }).run();
    };
</script>

<div class="w-[300px]" bind:this={element}>
    <div class="w-full flex justify-start items-start gap-2">
        <div class="flex-1">
            <BubbleMenuTextArea
                bind:value
                rows="4"
                onchange={handleDone}
                spellcheck="false"
                placeholder={"|x| = \\begin{cases} \n   x, &\\quad x \\geq 0 \\\\ \n   -x. &\\quad x < 0 \n \\end{cases}"} />
        </div>
        <div>
            <div class="flex-0">
                <BubbleMenuButton size="small" onclick={handleDone} disabled={!!message}>Done</BubbleMenuButton>
            </div>
        </div>
    </div>

    <div class="w-full flex justify-start items-center gap-2">
        <div class="flex-1">
            {#if message}
                Invalid Katex
            {/if}
        </div>
    </div>
</div>

<!-- transition:fade={{ duration: 200 }} -->
<!-- rel="noopener noreferrer"  -->
