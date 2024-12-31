<script>
    import { BubbleMenuPlugin } from "@tiptap/extension-bubble-menu";
    import { onMount } from "svelte";
    import { isColumnGripSelected } from "./utils";
    import SharedBubbleMenu from "$components/shared/SharedBubbleMenu";
    import SharedBubbleMenuItem from "$components/shared/SharedBubbleMenuItem";

    const pluginKey = "tableColumnMenu";

    export let editor;
    let element;

    onMount(() => {
        const plugin = BubbleMenuPlugin({
            pluginKey,
            editor,
            element,
            tippyOptions: {
                theme: "bubble-menu",
                placement: "top",
                popperOptions: {
                    modifiers: [{ name: "flip", enabled: false }],
                },
                appendTo: () => {
                    return document.getElementById("PORTAL-ROOT");
                },
                popperOptions: {
                    onHidden: () => {
                        showEdit = false;
                    },
                    arrow: false,

                    offset: [0, 15],
                    modifiers: [{ name: "flip", enabled: false }],
                },
            },
            shouldShow: ({ view, state, from }) => {
                if (!state) {
                    return false;
                }

                return isColumnGripSelected({ editor, view, state, from: from || 0 });
            },
        });

        editor.registerPlugin(plugin);

        return () => editor.unregisterPlugin(pluginKey);
    });

    const onAddColumnBefore = () => {
        editor.chain().focus().addColumnBefore().run();
    };

    const onAddColumnAfter = () => {
        editor.chain().focus().addColumnAfter().run();
    };

    const onDeleteColumn = () => {
        editor.chain().focus().deleteColumn().run();
    };
</script>

<div bind:this={element}>
    <SharedBubbleMenu>
        <SharedBubbleMenuItem label="Add column before" onClick={onAddColumnBefore} />
        <SharedBubbleMenuItem label="Add column after" onClick={onAddColumnAfter} />
        <SharedBubbleMenuItem label="Delete column" onClick={onDeleteColumn} />
    </SharedBubbleMenu>
</div>
<!-- 
export const TableColumnMenu = React.memo(({ editor, appendTo }: MenuProps): JSX.Element => {
    const shouldShow = useCallback(
        ({ view, state, from }: ShouldShowProps) => {
            if (!state) {
                return false;
            }

            return isColumnGripSelected({ editor, view, state, from: from || 0 });
        },
        [editor],
    );

    const onAddColumnBefore = useCallback(() => {
        editor.chain().focus().addColumnBefore().run();
    }, [editor]);

    const onAddColumnAfter = useCallback(() => {
        editor.chain().focus().addColumnAfter().run();
    }, [editor]);

    const onDeleteColumn = useCallback(() => {
        editor.chain().focus().deleteColumn().run();
    }, [editor]);

    return (
        <BaseBubbleMenu
            editor={editor}
            pluginKey='tableColumnMenu'
            updateDelay={0}
            tippyOptions={{
                appendTo: () => {
                    return appendTo?.current;
                },
                offset: [0, 15],
                popperOptions: {
                    modifiers: [{ name: "flip", enabled: false }],
                },
            }}
            shouldShow={shouldShow}>
            <Toolbar.Wrapper isVertical>
                <PopoverMenu.Item iconComponent={<Icon name='ArrowLeftToLine' />} close={false} label='Add column before' onClick={onAddColumnBefore} />
                <PopoverMenu.Item iconComponent={<Icon name='ArrowRightToLine' />} close={false} label='Add column after' onClick={onAddColumnAfter} />
                <PopoverMenu.Item icon='Trash' close={false} label='Delete column' onClick={onDeleteColumn} />
            </Toolbar.Wrapper>
        </BaseBubbleMenu>
    );
});
 -->
