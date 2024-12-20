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
</script>

<div class={cn(className, "flex justify-start items-center")}>
    <div class={cn("p-2.5 flex justify-start items-center gap-2 bg-background-toolbar text-text-toolbar")}>
        <AiTools {editor} />
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
        <!-- <FontTools {editor} /> -->
    </div>
</div>
