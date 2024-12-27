<script>
    export let className;
    export let color = "currentColor"; // default color
    export let width = "20"; // default width
    export let height = "20"; // default height
</script>

<svg viewBox="0 0 24 24" {width} {height} fill={color} class={className}>
    <circle cx="8" cy="6" r="2" />
    <circle cx="16" cy="6" r="2" />
    <circle cx="8" cy="12" r="2" />
    <circle cx="16" cy="12" r="2" />
    <circle cx="8" cy="18" r="2" />
    <circle cx="16" cy="18" r="2" />
</svg>
