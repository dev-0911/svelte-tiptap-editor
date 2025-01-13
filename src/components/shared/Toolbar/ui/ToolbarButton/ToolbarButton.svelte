<script>
    import cn from "classnames";
    import { Button, Tooltip } from "flowbite-svelte";

    const { actived, disabled, onclick, className, hint, children, ...rest } = $props();
</script>

<Button
    {disabled}
    {onclick}
    class={cn(
        className,
        "p-1 rounded-sm",
        "bg-background-toolbar hover:bg-background-toolbar-hovered",
        actived && "bg-background-toolbar-selected",
        disabled && "bg-background-toolbar-disabled",
    )}
    {...rest}>
    {#if children}
        {@render children()}
    {/if}
</Button>

{#if hint}
    <Tooltip>
        {hint}
    </Tooltip>
{/if}
