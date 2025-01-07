<script>
    import cn from "classnames";
    import { Button } from "flowbite-svelte";

    let { label, className, onClick, command, actived, disabled, children } = $props();
</script>

<Button
    {disabled}
    on:click={onClick}
    data-command={command}
    class={cn(
        className,
        "w-full px-2 py-1 flex justify-start items-center gap-2 rounded-sm",
        "bg-background hover:bg-background-hovered text-sm text-left text-black hover:drop-shadow-md",
    )}>
    {#if children}
        {@render children()}
    {/if}
</Button>
