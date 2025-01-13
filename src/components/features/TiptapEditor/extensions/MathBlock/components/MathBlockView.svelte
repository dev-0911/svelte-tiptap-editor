<script>
    import { NodeViewWrapper } from "$components/shared/Svelte-tiptap";

    let { editor, getPos, node } = $props();
    let focused = $state(false);

    const onClick = () => {
        editor.commands.setNodeSelection(getPos());
    };

    let content = $derived(node.attrs.content);
    let katex = $derived(node.attrs.katex);
</script>

<NodeViewWrapper>
    <div
        role="button"
        tabindex="0"
        class="w-full h-auto"
        onclick={onClick}
        onkeydown={(event) => {
            if (event.key === "Enter" || event.key === "Space") {
                onClick();
            }
        }}>
        <div data-katex={katex}>
            {#if !!katex}
                <div class="px-2 py-4 flex justify-center items-center rounded-md">
                    {@html content}
                </div>
            {:else}
                <div class="p-2 flex justify-start items-center rounded-md">
                    <p>Add a TeX equation</p>
                </div>
            {/if}
        </div>
    </div>
</NodeViewWrapper>

<!-- <style>
    .isFocusd {
        background-color: var(--background-color-math-focused);
    }
</style> -->
