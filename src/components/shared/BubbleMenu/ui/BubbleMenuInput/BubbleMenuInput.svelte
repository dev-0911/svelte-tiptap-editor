<script>
    import "../BubbleMenu.css";
    let { value, onchange, ...rest } = $props();
</script>

<input class="tiptap-bubble-menu-input" {onchange} bind:value {...rest} />
