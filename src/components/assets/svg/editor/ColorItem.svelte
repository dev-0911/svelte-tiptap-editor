<script>
    export let className;
    export let color = "currentColor"; // default color
    export let width = "18px"; // default width
    export let height = "18px"; // default height
</script>

<svg viewBox="0 0 20 20" {width} {height} fill={color} class={className}>
    <rect width="20" height="20" />
</svg>
