<script>
    import cn from "classnames";
    import Divider from "$components/shared/Divider";
    import AiTools from "./AiTools/AiTools.svelte";
    import AlignTools from "./AlignTools/AlignTools.svelte";
    import CommandTools from "./CommandTools/CommandTools.svelte";
    import FormattingTools from "./FormattingTools/FormattingTools.svelte";
    import IndentTools from "./IndentTools/IndentTools.svelte";
    import FontTools from "./FontTools/FontTools.svelte";
    import StyleTools from "./StyleTools/StyleTools.svelte";
    import ExportTools from "./ExportTools/ExportTools.svelte";
    import CodeTools from "./CodeTools/CodeTools.svelte";
    import InsertTools from "./InsertTools/InsertTools.svelte";
    import CommentTools from "./CommentTools/CommentTools.svelte";

    const { editor, className, onInsertAbove, onInsertBelow, onReplace, aiData, aiState, aiResponse } = $props();

    $effect(() => {
        console.log("Toolbar", aiData);
    });

    $effect(() => {
        console.log(aiState);
        console.log(aiResponse);
    });
</script>

<div id="toolbar" class={cn(className, "flex justify-center items-center")}>
    <div class={cn("w-full p-2.5 flex flex-wrap justify-center items-center gap-2 bg-background-toolbar text-text-toolbar")}>
        <AiTools {editor} {onReplace} {onInsertBelow} {onInsertAbove} {aiData} />
        <Divider />
        <!-- <CommandTools {editor} />
        <Divider /> -->
        <ExportTools {editor} />
        <Divider />
        <FormattingTools {editor} />
        <Divider />
        <AlignTools {editor} />
        <Divider />
        <FontTools {editor} />
        <Divider />
        <StyleTools {editor} />
        <Divider />
        <IndentTools {editor} />
        <Divider />
        <CodeTools {editor} />
        <Divider />
        <InsertTools {editor} />
        <Divider />
        <CommentTools {editor} />
        <!-- <FloatingMenu
            {editor}
            shouldShow={onShow}
            className="w-full"
            tippyOptions={{
                appendTo: document.getElementById("PORTAL-ROOT"),
                theme: "custom",
                placement: "bottom-start",
                arrow: false,
                hideOnClick: false,
                maxWidth: "none",
                sticky: true,
            }} /> -->
    </div>
</div>
