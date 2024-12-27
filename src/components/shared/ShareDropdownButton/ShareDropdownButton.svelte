<script>
    import cn from "classnames";
    import { Button } from "flowbite-svelte";

    export let disabled;
    export let className;
    export let command;
    export let onClick;
</script>

<Button
    {disabled}
    on:click={onClick}
    data-command={command}
    class={cn(className, "w-full px-2 py-1 flex justify-start items-center gap-2", "bg-background hover:bg-background-hovered text-sm text-left text-black hover:drop-shadow-md")}>
    <slot />
</Button>
