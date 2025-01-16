<script>
    import { ImageBlockMenu, LinkBubbleMenu, MathBlockMenu } from "../../extensions";
    import TableColumn from "../../extensions/Table/menus/TableColumn/TableColumn.svelte";
    import TableRow from "../../extensions/Table/menus/TableRow/TableRow.svelte";

    let { editor } = $props();
</script>

<div>
    <TableColumn {editor} />
    <TableRow {editor} />
    <ImageBlockMenu {editor} />
    <LinkBubbleMenu {editor} />
    <MathBlockMenu {editor} />
</div>
