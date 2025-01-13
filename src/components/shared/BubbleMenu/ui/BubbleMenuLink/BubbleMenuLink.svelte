<script>
    import "../BubbleMenu.css";
    const { href, label } = $props();
</script>

<a {href} target="_blank" rel="noopener noreferrer" class="tiptap-bubble-menu-link">
    {label}
</a>
