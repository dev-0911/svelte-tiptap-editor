<script>
    import cn from "classnames";
    import { Tooltip } from "flowbite-svelte";
    let { hint, onClick, actived, disabled, children } = $props();
</script>

<button
    onclick={onClick}
    class={cn(
        "p-1 rounded-sm bg-background hover:bg-background-hovered !text-sm text-left text-black hover:drop-shadow-md",
        actived && "bg-background-toolbar-selected",
        disabled && "bg-background-toolbar-disabled",
    )}>
    {#if children}
        {@render children()}
    {/if}
</button>
{#if hint}
    <Tooltip class="text-white" style={{ color: "#fff" }}>{hint}</Tooltip>
{/if}
