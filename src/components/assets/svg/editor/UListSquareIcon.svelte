<script>
    export let className;
    export let color = "currentColor"; // default color
    export let width = "20"; // default width
    export let height = "20"; // default height
</script>

<svg viewBox="0 0 44 44" {width} {height} fill={color} class={className}>
    <path
        d="M35 29a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H18a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1h17zm0-9a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H18a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1h17zm0-9a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H18a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1h17z"
        fill-opacity=".163">
    </path>
    <path d="M14 27v6H8v-6h6zm0-9v6H8v-6h6zm0-9v6H8V9h6z"></path>
</svg>
