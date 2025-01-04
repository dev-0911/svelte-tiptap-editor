<script>
    import cn from "classnames";
    import IndentDecIcon from "$components/assets/svg/editor/IndentDecIcon.svelte";
    import IndentIncIcon from "$components/assets/svg/editor/IndentIncIcon.svelte";
    import SharedToolbarButton from "$components/shared/SharedToolbarButton/SharedToolbarButton.svelte";

    const { editor } = $props();

    let activedIndentDec = $state(false);
    let activedIndentInc = $state(false);

    let disabledIndentDec = $derived(!editor.can().chain().focus().liftListItem("listItem").run());
    let disabledIndentInc = $derived(!editor.can().chain().focus().sinkListItem("listItem").run());

    const handleIndentDec = () => {
        editor.chain().focus().liftListItem("listItem").run();
    };
    const handleIndentInc = () => {
        editor.chain().focus().sinkListItem("listItem").run();
    };
</script>

<div class="flex justify-start items-center gap-1">
    <SharedToolbarButton hint="Decrease indent" disabled={disabledIndentDec} onclick={handleIndentDec}>
        <IndentDecIcon className={cn("fill-text-toolbar", disabledIndentDec && "fill-text-toolbar-disabled")} />
    </SharedToolbarButton>

    <SharedToolbarButton hint="Increase indent" disabled={disabledIndentInc} onclick={handleIndentInc}>
        <IndentIncIcon className={cn("fill-text-toolbar", disabledIndentInc && "fill-text-toolbar-disabled")} />
    </SharedToolbarButton>
</div>
