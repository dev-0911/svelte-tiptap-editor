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

<NodeViewWrapper>
    <div
        class={cn("w-full", node.attrs.align === "left" ? "ml-0" : "ml-auto", node.attrs.align === "right" ? "mr-0" : "mr-auto", node.attrs.align === "center" && "mx-auto")}
        style={`width: ${width}`}>
        <div contentEditable={false} class="w-full h-auto">
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
                <img class="block w-full h-auto" {src} alt="" />
            </div>
        </div>
    </div>
</NodeViewWrapper>
