<script>
    import { BubbleMenuPlugin } from "@tiptap/extension-bubble-menu";
    import { onMount } from "svelte";
    import isRowGripSelected from "./utils";
    import SharedBubbleMenu from "$components/shared/SharedBubbleMenu";
    import SharedBubbleMenuItem from "$components/shared/SharedBubbleMenuItem";
    import TrashIcon from "$components/assets/svg/editor/TrashIcon.svelte";
    import ArrowDown from "$components/assets/svg/editor/ArrowDown.svelte";
    import ArrowUp from "$components/assets/svg/editor/ArrowUp.svelte";
    export let editor;
    const pluginKey = "tableRowMenu";

    let element;

    onMount(() => {
        const plugin = BubbleMenuPlugin({
            pluginKey,
            editor,
            element,
            tippyOptions: {
                theme: "bubble-menu",
                placement: "left",
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

                return isRowGripSelected({ editor, view, state, from: from || 0 });
            },
        });

        editor.registerPlugin(plugin);

        return () => editor.unregisterPlugin(pluginKey);
    });

    const onAddRowBefore = () => {
        editor.chain().focus().addRowBefore().run();
    };

    const onAddRowAfter = () => {
        editor.chain().focus().addRowAfter().run();
    };

    const onDeleteRow = () => {
        editor.chain().focus().deleteRow().run();
    };
</script>

<div bind:this={element}>
    <SharedBubbleMenu>
        <SharedBubbleMenuItem label="Add row before" onClick={onAddRowBefore}><ArrowUp width="18px" height="18px" /></SharedBubbleMenuItem>
        <SharedBubbleMenuItem label="Add row after" onClick={onAddRowAfter}><ArrowDown width="18px" height="18px" /></SharedBubbleMenuItem>
        <SharedBubbleMenuItem label="Delete row" onClick={onDeleteRow}><TrashIcon width="18px" height="18px" /></SharedBubbleMenuItem>
    </SharedBubbleMenu>
</div>

<!-- import { BubbleMenu as BaseBubbleMenu } from "@tiptap/react";
import React, { useCallback } from "react";
import * as PopoverMenu from "@/components/ui/PopoverMenu";

import { Toolbar } from "@/components/ui/Toolbar";
import { isRowGripSelected } from "./utils";
import { Icon } from "@/components/ui/Icon";
import { MenuProps, ShouldShowProps } from "@/components/menus/types";

export const TableRowMenu = React.memo(({ editor, appendTo }: MenuProps): JSX.Element => {
    const shouldShow = useCallback(
        ({ view, state, from }: ShouldShowProps) => {
            if (!state || !from) {
                return false;
            }

            return isRowGripSelected({ editor, view, state, from });
        },
        [editor],
    );

    const onAddRowBefore = useCallback(() => {
        editor.chain().focus().addRowBefore().run();
    }, [editor]);

    const onAddRowAfter = useCallback(() => {
        editor.chain().focus().addRowAfter().run();
    }, [editor]);

    const onDeleteRow = useCallback(() => {
        editor.chain().focus().deleteRow().run();
    }, [editor]);

    return (
        <BaseBubbleMenu
            editor={editor}
            pluginKey='tableRowMenu'
            updateDelay={0}
            tippyOptions={{
                appendTo: () => {
                    return appendTo?.current;
                },
                placement: "left",
                offset: [0, 15],
                popperOptions: {
                    modifiers: [{ name: "flip", enabled: false }],
                },
            }}
            shouldShow={shouldShow}>
            <Toolbar.Wrapper isVertical>
                <PopoverMenu.Item iconComponent={<Icon name='ArrowUpToLine' />} close={false} label='Add row before' onClick={onAddRowBefore} />
                <PopoverMenu.Item iconComponent={<Icon name='ArrowDownToLine' />} close={false} label='Add row after' onClick={onAddRowAfter} />
                <PopoverMenu.Item icon='Trash' close={false} label='Delete row' onClick={onDeleteRow} />
            </Toolbar.Wrapper>
        </BaseBubbleMenu>
    );
});

TableRowMenu.displayName = "TableRowMenu";

export default TableRowMenu; -->
