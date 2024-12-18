<script>
    export let name = "stranger";
    import TiptapEditor, { useTiptapEditor } from "$components/features/TiptapEditor";
    const [editorProps, editorActions] = useTiptapEditor();
    console.log(editorProps, editorActions.isActive());
    const handleCreate = (props) => {
        if (editorProps && typeof editorProps.onCreate === "function") {
            editorProps.onCreate(props);
        }
    };

    const handleDestroy = () => {
        if (editorProps && typeof editorProps.onDestroy === "function") {
            editorProps.onDestroy();
        }
    };

    const handleClick = () => {
        console.log("test");
        console.log(editorProps, editorActions.isActive(), editorActions.getHTML());
    };
</script>

<main>
    <h1>Hello {name}!</h1>
    <p>
        Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a>
        to learn how to build Svelte apps.
    </p>
    <TiptapEditor className="focus-within:outline-none" onCreate={handleCreate} onDestory={handleDestroy} />
</main>

<style>
    main {
        text-align: center;
        padding: 1em;
        max-width: 240px;
        margin: 0 auto;
    }

    h1 {
        color: #ff3e00;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
    }

    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }
</style>
