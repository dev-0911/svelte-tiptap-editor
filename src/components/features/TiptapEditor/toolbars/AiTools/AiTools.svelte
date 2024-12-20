<script>
    import { Button, ButtonGroup } from "flowbite-svelte";

    import LogoIcon from "$components/assets/svg/LogoIcon.svelte";
    export let editor;
</script>

<Button class="min-w-32 p-1 bg-background-toolbar hover:bg-background-toolbar-hovered text-text-toolbar rounded-sm">
    <LogoIcon width="24px" height="24px" />STEAMid AI
</Button>
