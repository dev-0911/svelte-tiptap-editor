<script>
    import { getContext, onMount, tick } from "svelte";
    import { TIPTAP_NODE_VIEW } from "./context";

    const { as = "div", children, ...rest } = $props();

    const { onDragStart } = getContext<TiptapNodeViewContext>(TIPTAP_NODE_VIEW);
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
