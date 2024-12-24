<script>
    export let className;
    export let color = "currentColor"; // default color
    export let width = "20"; // default width
    export let height = "20"; // default height
</script>

<svg viewBox="0 0 24 24" {width} {height} fill={color} class={className}>
    <path d="M13 6V21H11V6H5V4H19V6H13Z"></path>
</svg>
