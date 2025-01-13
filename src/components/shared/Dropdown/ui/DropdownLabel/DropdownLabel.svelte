<script>
    import "../Dropdown.css";
    const { children } = $props();
</script>

<span class="dropdown-label">
    {#if children}
        {@render children()}
    {/if}
</span>
