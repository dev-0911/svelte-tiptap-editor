<script>
    import cn from "classnames";
    import SharedToolbarButton from "$components/shared/SharedToolbarButton/SharedToolbarButton.svelte";
    import CmdDownloadIcon from "$components/assets/svg/editor/CmdDownloadIcon.svelte";
    import CmdUploadIcon from "$components/assets/svg/editor/CmdUploadIcon.svelte";

    const { editor } = $props();

    let isLoading = $state(false);
    let error = $state(null);

    let fileInput;

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
    <input type="file" accept=".docx" onchange={ImportFromInput} bind:this={fileInput} class="hidden" />
    <SharedToolbarButton hint="Import from docx" onclick={ImportButtonClick} disabled={!editor}>
        <CmdUploadIcon className={cn("fill-text-toolbar", !editor && "fill-text-toolbar-disabled")} />
    </SharedToolbarButton>

    <SharedToolbarButton hint="Export as docx" onclick={ExportToWord} disabled={!editor}>
        <CmdDownloadIcon className={cn("fill-text-toolbar", !editor && "fill-text-toolbar-disabled")} />
    </SharedToolbarButton>
</div>
