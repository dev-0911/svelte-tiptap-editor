<script>
    export let className;
    export let color = "currentColor"; // default color
    export let width = "20"; // default width
    export let height = "20"; // default height
</script>

<svg viewBox="0 0 20 20" {width} {height} fill={color} class={className}>
    <rect width="20" height="20" />
</svg>
