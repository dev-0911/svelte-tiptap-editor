<script>
    import cn from "classnames";
    import { Tooltip } from "flowbite-svelte";
    let { hint, onClick, actived, disabled, children } = $props();
</script>

<button onclick={onClick} class={cn("p-1 rounded-sm hover:drop-shadow-md", actived && "actived", disabled && "disabled")}>
    {#if children}
        {@render children()}
    {/if}
</button>
{#if hint}
    <Tooltip class="tippy-hint text-white" style={{ color: "#fff" }}>{hint}</Tooltip>
{/if}
