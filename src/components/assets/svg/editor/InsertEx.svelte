<script>
    export let className;
    export let color = "currentColor"; // default color
    export let width = "18px"; // default width
    export let height = "18px"; // default height
</script>

<svg viewBox="0 0 24 24" {width} {height} fill={color} class={className}>
    <text x="2" y="18" font-family="Arial" font-size="18" font-weight="bold">
        e
        <tspan font-size="12">x</tspan>
    </text>
</svg>
