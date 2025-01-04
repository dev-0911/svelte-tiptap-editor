<script>
    import { getContext, onMount, tick } from "svelte";

    import { TIPTAP_NODE_VIEW } from "./context";
    import { TiptapNodeViewContext } from "./types";

    const { as = "div", children, ...rest } = $props();

    // const { onDragStart } = getContext<TiptapNodeViewContext>(TIPTAP_NODE_VIEW);

    const onDragStart = () => {};
    let element;

    onMount(async () => {
        await tick();
        element.style.whiteSpace = "normal";
    });
</script>

<svelte:element this={as} bind:this={element} data-node-view-wrapper="" role="none" {...rest} ondragstart={onDragStart}>
    {#if children}
        {@render children()}
    {/if}
</svelte:element>
