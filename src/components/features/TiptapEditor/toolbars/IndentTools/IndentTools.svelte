<script>
    import { Button, ButtonGroup } from "flowbite-svelte";
    import IndentDecIcon from "$components/assets/svg/editor/IndentDecIcon.svelte";
    import IndentIncIcon from "$components/assets/svg/editor/IndentIncIcon.svelte";
    export let editor;

    $: isIndentDecDisabled = !editor.can().chain().focus().liftListItem("listItem").run();
    $: isIndentIncDisabled = !editor.can().chain().focus().sinkListItem("listItem").run();
</script>

<div class="flex justify-start items-center gap-1">
    <Button
        class="p-1 bg-background-toolbar hover:bg-background-toolbar-hovered rounded-sm"
        disabled={isIndentDecDisabled}
        on:click={() => editor.chain().focus().liftListItem("listItem").run()}>
        <IndentDecIcon width="18px" height="18px" className={isIndentDecDisabled ? "fill-text-toolbar" : "fill-text-toolbar-selected"} />
    </Button>
    <Button
        class="p-1 bg-background-toolbar hover:bg-background-toolbar-hovered rounded-sm"
        disabled={isIndentIncDisabled}
        on:click={() => editor.chain().focus().sinkListItem("listItem").run()}>
        <IndentIncIcon width="18px" height="18px" className={isIndentIncDisabled ? "fill-text-toolbar" : "fill-text-toolbar-selected"} />
    </Button>
</div>
