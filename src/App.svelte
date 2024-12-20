<script>
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
    <TiptapEditor className="focus-within:outline-none" onCreate={handleCreate} onDestory={handleDestroy} />
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
