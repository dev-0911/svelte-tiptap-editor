<script>
    import SteamidEditor from "$components/widgets/SteamidEditor/SteamidEditor.svelte";
</script>

<main class="bg-background relative">
    <SteamidEditor className="relative z-10 focus-within:outline-none" />

    <div id="PORTAL-ROOT" class="absolute z-20 top-0 left-0 w-full floating-panel"></div>
</main>

<style>
    main {
        max-width: 240px;
        margin: 0 auto;
    }

    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }
</style>
