<script>
    import "../BubbleMenu.css";
    const { children } = $props();
</script>

<span class="tiptap-bubble-menu-label">
    {#if children}
        {@render children()}
    {/if}
</span>
