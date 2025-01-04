<script>
    import { onMount as onComponentMount, onDestroy as onComponentDestroy } from "svelte";

    import { Editor } from "@tiptap/core";
    import useExtensions from "./extensions/useExtensions";
    import Toolbar from "./toolbars/Toolbar.svelte";
    import { useTiptapEditor } from "./useTiptapEditor";
    import CustomDragHandle from "./elements/CustomDragHandle";
    import LinkBubbleMenu from "./elements/LinkBubbleMenu/LinkBubbleMenu.svelte";
    import TableColumn from "./extensions/Table/menus/TableColumn/TableColumn.svelte";
    import TableRow from "./extensions/Table/menus/TableRow/TableRow.svelte";
    import ImageBlockMenu from "./extensions/ImageBlock/components/ImageBlockMenu.svelte";
    import EmojiPicker from "$components/shared/EmojiPicker/EmojiPicker.svelte";

    // Initial content for the editor
    const content = `<h1>One morning, when Gregor Samsa woke from troubled 
        dreams.</h1>
      <ul>
        <li>$\\sin(x)$</li>
        <li>$\\cos(x)$</li>
        <li>$\\tan(x)$</li>
        <li>$\\log(x)$</li>
        <li>$\\ln(x)$</li>
        <li>$\\sqrt{x}$</li>
        <li>$\\sum_{i=0}^n x_i$</li>
        <li>$\\int_a^b x^2 dx$</li>
        <li>$\\frac{1}{x}$</li>
        <li>$\\binom{n}{k}$</li>
        <li>$\\sqrt[n]{x}$</li>
        <li>$\\left(\\frac{1}{x}\\right)$</li>
        <li>$\\left\\{\\begin{matrix}x&\\text{if }x>0\\\\0&\\text{otherwise}\\end{matrix}\\right.$</li>
      </ul>
        <h2>The bedding was hardly able to cover it.</h2>
        <p>One morning, when Gregor Samsa woke from troubled 
dreams, he found himself transformed in his bed into 
a horrible vermin. He lay on his armour-like back, 
and if he lifted his head a little he could see his 
brown belly, slightly domed and divided by arches into 
stiff sections. The bedding was hardly able to cover 
<strong>strong</strong> it and seemed ready to slide 
off any moment. His many legs, pitifully thin 
compared with the size of the rest of him, 
<a class="external ext" href="#">link</a> waved about 
helplessly as he looked. "What's happened to me? " he 
thought. It wasn't a dream. His room, a proper human 
room although a little too small, lay peacefully 
between its four familiar walls.</p>
<p>It showed a lady fitted out with a fur hat and fur 
    boa who sat upright, raising a heavy fur muff that 
    covered the whole of her lower arm towards the 
    viewer.</p>
    <h2>The bedding was hardly able to cover it.</h2>
    <p>It showed a lady fitted out with a fur hat and fur 
        boa who sat upright, raising a heavy fur muff that 
        covered the whole of her lower arm towards the 
        viewer.</p>
        <ul>
            <li>Lorem ipsum dolor sit amet consectetuer.</li>
            <li>Aenean commodo ligula eget dolor.</li>
            <li>Aenean massa cum sociis natoque penatibus.</li>
            </ul>
            <p>One morning, when Gregor Samsa woke from troubled 
                dreams, he found himself transformed in his bed into 
                a horrible vermin. He lay on his armour-like back, 
                and if he lifted his head a little he could see his 
                brown belly, slightly domed and divided by arches into 
                stiff sections. The bedding was hardly able to cover 
                <strong>strong</strong> it and seemed ready to slide 
                off any moment. His many legs, pitifully thin 
                compared with the size of the rest of him, 
                <a class="external ext" href="#">link</a> waved about 
                helplessly as he looked. "What's happened to me? " he 
                thought. It wasn't a dream. His room, a proper human 
                room although a little too small, lay peacefully 
                between its four familiar walls.</p>
                <p>It showed a lady fitted out with a fur hat and fur 
                    boa who sat upright, raising a heavy fur muff that 
                    covered the whole of her lower arm towards the 
                    viewer.</p>`;

    let element;
    let editor;
    let dragElement;
    let dragItem;

    // const words = writable(0);
    // const characters = writable(0);

    const [editorProps, editorActions] = useTiptapEditor();
    const handleCreate = (editorInstance) => {
        editorProps.onCreate(editorInstance);
    };

    const handleDestroy = () => {
        editorProps.onDestroy();
    };

    const onInsertAbove = (content) => {
        editorActions.insertAbove(content);
    };

    const onInsertBelow = (content) => {
        editorActions.insertBelow(content);
    };

    const onReplace = (content) => {
        editorActions.replaceWithText(content);
    };
    const appId = import.meta.env.VITE_TIPTAP_APP_ID;
    const token = import.meta.env.VITE_TIPTAP_JWT_TOKEN;
    const extensions = useExtensions(appId, token);

    onComponentMount(() => {
        editor = new Editor({
            element,
            extensions,
            content,
            editorProps: {
                attributes: {
                    class: "focus:outline-none w-full",
                },
                spellcheck: "false",
                suppressContentEditableWarning: "true",
            },
            immediatelyRender: false,
            onCreate: handleCreate,
            onDestroy: handleDestroy,
            onTransaction: () => {
                // force re-render so `editor.isActive` works as expected
                editor = editor;
            },
        });
        // dragItem = new DragHandle({
        //     element: dragElement,
        // });
    });

    onComponentDestroy(() => {
        if (editor) {
            editor.destroy();
        }
    });
</script>

<div class="w-screen h-screen bg-background text-text">
    <div class="h-full flex flex-col border border-border-toolbar text-text overflow-hidden">
        {#if editor}
            <Toolbar className="flex-0 relative z-10 w-full bg-background-toolbar border-b border-b-border-toolbar" {editor} {onInsertBelow} {onInsertAbove} {onReplace} />
            <CustomDragHandle {editor} />
            <LinkBubbleMenu {editor} />
            <TableColumn {editor} />
            <TableRow {editor} />
            <ImageBlockMenu {editor} />
        {/if}
        <!-- <div bind:this={dragElement}></div> -->

        <div class="flex-1 relative z-0 w-full px-10 py-5 overflow-y-auto scrollbar" bind:this={element} spellcheck="false"></div>
    </div>
</div>
<!-- <EmojiPicker /> -->
