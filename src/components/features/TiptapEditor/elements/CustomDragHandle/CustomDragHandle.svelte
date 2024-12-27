<script>
    import { onMount } from "svelte";
    import { DragHandlePlugin } from "@tiptap-pro/extension-drag-handle";

    export let editor;
    export let tippyOptions = {};
    export let onNodeChange;
    export let className;
    let element;

    onMount(() => {
        const plugin = DragHandlePlugin({
            editor,
            element,
            tippyOptions,
            onNodeChange,
        });

        editor.registerPlugin(plugin);

        return () => editor.unregisterPlugin(pluginKey);
    });
</script>

<div bind:this={element} class={className} draggable="false" style="pointer-events: none;"><slot /></div>
