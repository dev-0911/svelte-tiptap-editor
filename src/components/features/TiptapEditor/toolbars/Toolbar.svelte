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

    export let editor;
    export let className;
    export let onAdd;
    export let onReplace;
</script>

<div id="toolbar" class={cn(className, "flex justify-center items-center")}>
    <div class={cn("w-full p-2.5 flex justify-start items-center gap-2 bg-background-toolbar text-text-toolbar")}>
        <AiTools {editor} {onReplace} {onAdd} />
        <Divider />
        <CommandTools {editor} />
        <Divider />
        <FontTools {editor} />
        <Divider />
        <FormattingTools {editor} />
        <Divider />
        <StyleTools {editor} />
        <Divider />
        <AlignTools {editor} />
        <Divider />
        <IndentTools {editor} />
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
