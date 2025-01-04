<script>
    import "emoji-picker-element";

    export let onClick;
    const handleClick = (e) => {
        onClick?.(e.detail);
    };
</script>

<emoji-picker on:emoji-click={handleClick}></emoji-picker>
