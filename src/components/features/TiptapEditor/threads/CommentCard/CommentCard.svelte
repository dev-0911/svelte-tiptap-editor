<script>
    import { Button, Textarea } from "flowbite-svelte";

    let { name, createdAt, deleted, content, onEdit, onDelete, showActions = false } = $props();

    let isComposing = $state(false);
    let composeValue = $state(content);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (onEdit) {
            isComposing = false;
            onEdit(composeValue);
        }
    };
</script>

<div>
    <div class="mb-1 flex justify-start items-center gap-2">
        <div class="font-bold">{name}</div>
        <div>{new Date(createdAt).toLocaleTimeString()}</div>
    </div>

    {#if deleted}
        <div class="mb-1">
            <p>Comment was deleted</p>
        </div>
    {/if}

    {#if !isComposing && !deleted}
        <div class="mb-1 flex flex-col gap-2 text-xs">
            <p>{content}</p>

            {#if showActions}
                <div class="flex justify-start items-center gap-1">
                    <Button
                        color="blue"
                        class="px-2 py-1 text-xs"
                        onclick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            isComposing = true;
                        }}>
                        Edit
                    </Button>
                    {#if onDelete}
                        <Button
                            color="blue"
                            class="px-2 py-1 text-xs"
                            onclick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                onDelete();
                            }}>
                            Delete
                        </Button>
                    {/if}
                </div>
            {/if}
        </div>
    {/if}

    {#if isComposing && !deleted}
        <div class="comment-edit">
            <Textarea type="text" bind:value={composeValue} unWrappedClass="mb-1 p-1 text-xs" />
            <div class="flex justify-start items-center gap-1">
                <Button
                    class="px-2 py-1 text-xs"
                    color="blue"
                    type="reset"
                    onclick={() => {
                        isComposing = false;
                    }}>
                    Cancel
                </Button>
                <Button class="px-2 py-1 text-xs" color="blue" onclick={handleSubmit} disabled={!composeValue.length || composeValue === content}>Accept</Button>
            </div>
        </div>
    {/if}
</div>
