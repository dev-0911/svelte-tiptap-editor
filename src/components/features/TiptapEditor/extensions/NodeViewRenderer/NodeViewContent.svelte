<script>
    import { onMount, tick } from "svelte";

    const { as = "div", children, ...rest } = $props();

    let element;

    onMount(async () => {
        await tick();
        element.style.whiteSpace = "pre-wrap";
    });
</script>

<svelte:element this={as} bind:this={element} data-node-view-content {...rest}>
    {#if children}
        {@render children()}
    {/if}
</svelte:element>
