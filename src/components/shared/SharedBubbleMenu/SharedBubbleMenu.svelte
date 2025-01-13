<script>
    import cn from "classnames";
    let { className, children } = $props();
</script>

<div class={cn(className, "p-2 rounded-sm drop-shadow-sm")}>
    {#if children}
        {@render children()}
    {/if}
</div>
