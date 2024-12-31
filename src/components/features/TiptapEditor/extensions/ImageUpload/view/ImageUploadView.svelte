<script>
    export let getPos;
    export let editor;

    const onUpload = (url) => {
        if (url) {
            editor.chain().setImageBlock({ src: url }).deleteRange({ from: getPos(), to: getPos() }).focus().run();
        }
    };
    const { loading, uploadFile } = useUploader({ onUpload });
    const { handleUploadClick, ref } = useFileUpload();
    const { draggedInside, onDrop, onDragEnter, onDragLeave } = useDropZone({ uploader: uploadFile });
    const onFileChange = (e) => (e.target.files ? uploadFile(e.target.files[0]) : null);
</script>

<NodeViewWrapper>
    <div class="p-0 m-0" data-drag-handle>
        {#if loading}
            <div class="flex items-center justify-center p-8 rounded-lg min-h-[10rem] bg-opacity-80">
                <!-- <Spinner class="text-neutral-500" size={1.5} /> -->
            </div>
        {:else}
            <!-- const wrapperClass = cn("flex flex-col items-center justify-center px-8 py-10 rounded-lg bg-opacity-80", draggedInside && "bg-neutral-100"); return ( ) -->
            <!-- <div class={wrapperClass} {onDrop} onDragOver={onDragEnter} {onDragLeave} contentEditable={false}></div> -->
            <div {onDrop} onDragOver={onDragEnter} {onDragLeave} contentEditable={false}>
                <!-- <Icon name="Image" className="w-12 h-12 mb-4 text-black dark:text-white opacity-20" /> -->
                <div class="flex flex-col items-center justify-center gap-2">
                    <div class="text-sm font-medium text-center text-neutral-400 dark:text-neutral-500">{draggedInside ? "Drop image here" : "Drag and drop or"}</div>
                    <div>
                        <Button disabled={draggedInside} onClick={handleUploadClick} variant="primary" buttonSize="small">
                            <Icon name="Upload" />
                            Upload an image
                        </Button>
                    </div>
                </div>
                <input class="w-0 h-0 overflow-hidden opacity-0" {ref} type="file" accept=".jpg,.jpeg,.png,.webp,.gif" onChange={onFileChange} />
            </div>
        {/if}
    </div>
</NodeViewWrapper>
