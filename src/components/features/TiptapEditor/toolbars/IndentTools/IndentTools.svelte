<script>
    import cn from "classnames";
    import { Button } from "flowbite-svelte";
    import IndentDecIcon from "$components/assets/svg/editor/IndentDecIcon.svelte";
    import IndentIncIcon from "$components/assets/svg/editor/IndentIncIcon.svelte";
    import SharedToolbarButton from "$components/shared/ShareToolbarButton/SharedToolbarButton.svelte";
    export let editor;

    $: activedIndentDec = false;
    $: activedIndentInc = false;

    $: disabledIndentDec = !editor.can().chain().focus().liftListItem("listItem").run();
    $: disabledIndentInc = !editor.can().chain().focus().sinkListItem("listItem").run();

    const handleIndentDec = () => {
        editor.chain().focus().liftListItem("listItem").run();
    };
    const handleIndentInc = () => {
        editor.chain().focus().sinkListItem("listItem").run();
    };
</script>

<div class="flex justify-start items-center gap-1">
    <SharedToolbarButton disabled={disabledIndentDec} onClick={handleIndentDec}>
        <IndentDecIcon width="18px" height="18px" className={cn("fill-text-toolbar", disabledIndentDec && "fill-text-toolbar-disabled")} />
    </SharedToolbarButton>

    <SharedToolbarButton disabled={disabledIndentInc} onClick={handleIndentInc}>
        <IndentIncIcon width="18px" height="18px" className={cn("fill-text-toolbar", disabledIndentInc && "fill-text-toolbar-disabled")} />
    </SharedToolbarButton>
</div>
