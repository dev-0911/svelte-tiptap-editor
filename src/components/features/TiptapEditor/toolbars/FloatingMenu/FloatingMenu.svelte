<script>
    import AIIcon from "$components/assets/svg/editor/AIIcon.svelte";
    import { Input, Label, Helper, Button, Checkbox, A } from "flowbite-svelte";
    import { onMount } from "svelte";
    import { FloatingMenuPlugin } from "@tiptap/extension-floating-menu";

    import { invariant } from "./utils";

    export let editor;
    export let tippyOptions = {};
    export let pluginKey = "SvelteTiptapFloatingMenu";
    export let shouldShow = null;
    export let className;

    invariant(editor, "Missing editor instance.");

    let element;

    onMount(() => {
        const plugin = FloatingMenuPlugin({
            pluginKey,
            editor,
            element,
            tippyOptions,
            shouldShow,
        });

        editor.registerPlugin(plugin);
        return () => editor.unregisterPlugin(pluginKey);
    });
</script>

<div bind:this={element} class={className} style="visibility: hidden; width: 100%">
    <div class="w-full justify-start items-center text-sm">
        <div class="w-full flex justify-start items-center gap-2">
            <div class="flex-0">
                <AIIcon width="20px" height="20px" className="flex-0 fill-text-toolbar" />
            </div>
            <div class="flex-1">
                <Input
                    type="text"
                    id="first_name"
                    placeholder="AI Commands can generate or paraphrase text..."
                    size="sm"
                    class="p-1 text-text-toolbar bg-background-toolbar rounded-sm" />
            </div>
            <div class="flex-0">
                <Button class="p-1 flex justify-center items-center gap-2 bg-background-toolbar hover:bg-background-toolbar-hovered text-text-toolbar rounded-sm">Enter</Button>
            </div>
        </div>
    </div>
</div>
