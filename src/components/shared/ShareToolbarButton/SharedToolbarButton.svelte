<script>
    import cn from "classnames";
    import { Button } from "flowbite-svelte";

    export let actived;
    export let disabled;
    export let onClick;
    export let className;
</script>

<Button
    {disabled}
    on:click={onClick}
    class={cn(
        className,
        "p-1 rounded-sm",
        "bg-background-toolbar hover:bg-background-toolbar-hovered",
        actived && "bg-background-toolbar-selected",
        disabled && "bg-background-toolbar-disabled",
    )}>
    <slot />
</Button>
