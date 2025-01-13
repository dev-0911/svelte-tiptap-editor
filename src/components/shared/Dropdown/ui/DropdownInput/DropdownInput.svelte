<script>
    import "../Dropdown.css";
    let { value, onchange, ...rest } = $props();
</script>

<input class="dropdown-input" {onchange} bind:value {...rest} />
