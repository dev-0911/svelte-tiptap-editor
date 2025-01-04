<script>
    export let className;
    export let color = "currentColor"; // default color
    export let width = "18px"; // default width
    export let height = "18px"; // default height
</script>

<svg
    viewBox="0 0 24 24"
    {width}
    {height}
    fill={color}
    stroke="currentColor"
    stroke-width="2.5"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="lucide lucide-minus w-4 h-4 mr-1">
    <path d="M5 12h14"></path>
</svg>
