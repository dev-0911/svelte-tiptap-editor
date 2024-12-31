<script>
    import cn from "classnames";
    let { label, onClick, children } = $props();
</script>

<button
    onclick={onClick}
    class={"w-full px-2 py-1 rounded-sm flex justify-start items-center gap-2 bg-background hover:bg-background-hovered !text-sm text-left text-black hover:drop-shadow-md"}>
    {#if children}
        <span class="w-4">
            {@render children()}
        </span>
    {/if}
    {label}
</button>
