<script>
    import { NodeViewWrapper } from "$lib/SvelteNodeViewRender";
    import cn from "classnames";
    let { editor, getPos, node } = $props();
    const onClick = () => {
        editor.commands.setNodeSelection(getPos());
    };

    const { src } = node.attrs;
    const wrapperClassName = cn(node.attrs.align === "left" ? "ml-0" : "ml-auto", node.attrs.align === "right" ? "mr-0" : "mr-auto", node.attrs.align === "center" && "mx-auto");
</script>

<NodeViewWrapper>
    <div class={wrapperClassName} style={{ width: node.attrs.width }}>
        <button contentEditable={false} onclick={onClick}>
            <img class="block" {src} alt="" />
        </button>
    </div>
</NodeViewWrapper>
