<script>
    import "../BubbleMenu.css";
    let { value, onchange, ...rest } = $props();
</script>

<textarea class="tiptap-bubble-menu-textarea" {onchange} bind:value {...rest}></textarea>
