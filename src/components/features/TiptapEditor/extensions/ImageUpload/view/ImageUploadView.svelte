<script>
    import cn from "classnames";
    import { NodeViewWrapper } from "$lib/SvelteNodeViewRender";
    import { useUploader, useDropZone } from "./hooks";
    import { Button, Spinner } from "flowbite-svelte";
    import CmdUploadIcon from "$components/assets/svg/editor/CmdUploadIcon.svelte";

    const { editor, getPos } = $props();

    const onUpload = (url) => {
        if (url) {
            editor.chain().setImageBlock({ src: url }).deleteRange({ from: getPos(), to: getPos() }).focus().run();
        }
    };
    const { loading, uploadFile } = useUploader({ onUpload });

    const { draggedInside, onDrop, onDragEnter, onDragLeave } = useDropZone({ uploader: uploadFile });

    let inputElement = $state(null);

    const handleUploadClick = () => {
        inputElement.click();
        editor.commands.setNodeSelection(getPos());
    };

    const onFileChange = (e) => {
        e.target.files ? uploadFile(e.target.files[0]) : null;
    };
</script>

<NodeViewWrapper>
    <div class="p-0 m-0" data-drag-handle>
        {#if loading}
            <div class="flex items-center justify-center p-8 rounded-lg min-h-[10rem] bg-opacity-80">
                <Spinner size="4" bg="bg-border-main" class="fill-primary" />
            </div>
        {:else}
            <!-- const wrapperClass = cn("flex flex-col items-center justify-center px-8 py-10 rounded-lg bg-opacity-80", draggedInside && "bg-neutral-100"); return ( ) -->
            <!-- <div class={wrapperClass} {onDrop} onDragOver={onDragEnter} {onDragLeave} contentEditable={false}></div> -->
            <div
                class={cn("flex flex-col items-center justify-center px-8 py-10 rounded-lg bg-opacity-80", draggedInside && "bg-neutral-100")}
                {onDrop}
                onDragOver={onDragEnter}
                {onDragLeave}
                contentEditable={false}>
                <!-- <Icon name="Image" className="w-12 h-12 mb-4 text-black dark:text-white opacity-20" /> -->
                <div class="flex flex-col items-center justify-center gap-2">
                    <div class="text-sm font-medium text-center text-neutral-400 dark:text-neutral-500">{draggedInside ? "Drop image here" : "Drag and drop or"}</div>
                    <Button color="blue" onclick={handleUploadClick}>
                        <!-- <button disabled={draggedInside} onclick={handleUploadClick} variant="primary" buttonSize="small"> -->
                        <!-- <Icon name="Upload" /> -->
                        <CmdUploadIcon />
                        Upload an image
                        <!-- </button> -->
                    </Button>
                </div>
                <input class="w-0 h-0 overflow-hidden opacity-0" bind:this={inputElement} type="file" accept=".jpg,.jpeg,.png,.webp,.gif" onchange={onFileChange} />
            </div>
        {/if}
    </div>
</NodeViewWrapper>
