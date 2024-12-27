<script>
    import cn from "classnames";
    import ExportWordIcon from "$components/assets/svg/editor/ExportWordIcon.svelte";
    import ImportWordIcon from "$components/assets/svg/editor/ImportWordIcon.svelte";
    import SharedToolbarButton from "$components/shared/ShareToolbarButton/SharedToolbarButton.svelte";

    export let editor;

    let fileInput;

    let isLoading = false;
    let error;

    function ExportToWord() {
        editor
            .chain()
            .export({
                format: "docx",
                onExport(context) {
                    if (context?.error) {
                        error = context?.error;
                        isLoading = false;
                        console.log(error);
                        return;
                    }
                    context.download();

                    error = null;
                    isLoading = false;
                },
            })
            .run();
    }

    function ImportButtonClick() {
        fileInput.click();
    }

    function ImportFromInput(e) {
        console.log(e);
        const file = e.target.files[0];

        console.log(file);
        fileInput.value = "";

        if (!file) {
            return;
        }

        isLoading = true;
        error = null;

        editor
            .chain()
            .import({
                file,
                onImport(context) {
                    console.log(file, context.error);
                    if (context.error) {
                        error = context.error;
                        isLoading = false;
                        return;
                    }
                    context.setEditorContent(context.content);
                    error = null;
                    isLoading = false;
                },
            })
            .run();
    }
</script>

<div class="flex justify-start items-center gap-1">
    <SharedToolbarButton onClick={ExportToWord} disabled={!editor}>
        <ExportWordIcon width="18px" height="18px" className={cn("fill-text-toolbar", !editor && "fill-text-toolbar-disabled")} />
    </SharedToolbarButton>

    <SharedToolbarButton onClick={ImportButtonClick} disabled={!editor}>
        <ImportWordIcon width="18px" height="18px" className={cn("fill-text-toolbar", !editor && "fill-text-toolbar-disabled")} />
        <input type="file" accept=".docx" on:change={ImportFromInput} bind:this={fileInput} class="hidden" />
    </SharedToolbarButton>
</div>
