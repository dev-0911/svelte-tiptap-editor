<script>
    import { onMount as onComponentMount, onDestroy as onComponentDestroy } from "svelte";
    import { Editor } from "@tiptap/core";
    import useExtensions from "./extensions/useExtensions";

    export let onCreate;
    export let onDestroy;
    export let onClose;
    export let onApply;
    export let className = "";

    // Initial content for the editor
    const content = "<div><p>Hello World!</p><div>Hello!</div><p>World!</p></div>";

    let element;
    let editor;

    // const words = writable(0);
    // const characters = writable(0);
    const extensions = useExtensions();

    const handleClose = () => {
        if (typeof onClose === "function") {
            onClose();
        }
    };

    const handleApply = () => {
        if (typeof onApply === "function") {
            onApply();
        }
        handleClose();
    };

    const handleCreate = (editorInstance) => {
        if (typeof onCreate === "function") {
            onCreate(editorInstance);
        }
    };

    const handleDestroy = () => {
        if (typeof onDestroy === "function") {
            onDestroy();
        }
    };

    onComponentMount(() => {
        editor = new Editor({
            element,
            extensions,
            content,
            editorProps: {
                attributes: {
                    class: "focus:outline-none w-full",
                },
                spellcheck: "false",
                suppressContentEditableWarning: "true",
            },
            immediatelyRender: false,
            onCreate: handleCreate,
            onDestroy: handleDestroy,
            onTransaction: () => {
                // force re-render so `editor.isActive` works as expected
                editor = editor;
            },
        });
    });

    onComponentDestroy(() => {
        if (editor) {
            editor.destroy();
        }
    });
</script>

{#if editor}
    toolbar
{/if}

<div class={className} bind:this={element}></div>
