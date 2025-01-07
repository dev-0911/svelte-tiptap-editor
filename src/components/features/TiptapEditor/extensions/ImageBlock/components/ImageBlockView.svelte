<script>
    import { NodeViewWrapper } from "$lib/SvelteNodeViewRender";
    import cn from "classnames";
    let { editor, getPos, node } = $props();

    const onClick = () => {
        editor.commands.setNodeSelection(getPos());
    };

    let src = $derived(node.attrs.src);
    let width = $derived(node.attrs.width);
</script>

<!-- style={{ width: node.attrs.width }}> -->
<NodeViewWrapper>
    <div
        class={cn("w-full", node.attrs.align === "left" ? "ml-0" : "ml-auto", node.attrs.align === "right" ? "mr-0" : "mr-auto", node.attrs.align === "center" && "mx-auto")}
        style={`width: ${width}`}>
        <div contentEditable={false} class="w-full h-auto">
            <button onclick={onClick} class="w-full h-auto">
                <img class="block w-full h-auto" {src} alt="" />
            </button>
        </div>
    </div>
</NodeViewWrapper>
