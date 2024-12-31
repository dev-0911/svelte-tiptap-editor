<script>
    import cn from "classnames";
    import { Tooltip } from "flowbite-svelte";
    let { label, onClick, children } = $props();
</script>

<button onclick={onClick} class={"p-1 rounded-sm bg-background hover:bg-background-hovered !text-sm text-left text-black hover:drop-shadow-md"}>
    {#if children}
        {@render children()}
    {/if}
</button>

<Tooltip class="text-white">{label}</Tooltip>
