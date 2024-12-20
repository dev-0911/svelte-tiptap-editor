<script>
    export let className;
    export let color = "currentColor"; // default color
    export let width = "20"; // default width
    export let height = "20"; // default height
</script>

<svg viewBox="0 0 20 20" {width} {height} fill={color} class={className}>
    <path
        fill-rule="evenodd"
        d="M4 3a1 1 0 0 1 1-1h6a4.5 4.5 0 0 1 3.274 7.587A4.75 4.75 0 0 1 11.25 18H5a1 1 0 0 1-1-1V3Zm2.5 5.5v-4H11a2 2 0 1 1 0 4H6.5Zm0 2.5v4.5h4.75a2.25 2.25 0 0 0 0-4.5H6.5Z"
        clip-rule="evenodd" />
</svg>
