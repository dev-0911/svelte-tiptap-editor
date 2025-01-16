<script>
    import cn from "classnames";
    import { Tooltip } from "flowbite-svelte";
    import "../Dropdown.css";

    const { actived, disabled, onclick, before, after, children, tooltip, className, size } = $props();
</script>

<button data-size={size} class={cn(className, "dropdown-button flex justify-start items-center gap-2", actived && "actived", disabled && "disabled")} {onclick} {disabled}>
    {#if before}
        {before}
    {/if}
    {#if children}
        {@render children()}
    {/if}
    {#if after}
        {after}
    {/if}
</button>

{#if tooltip}
    <Tooltip class="dropdown-tooltip">{tooltip}</Tooltip>
{/if}
