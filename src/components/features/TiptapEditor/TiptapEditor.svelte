<script>
    import { onMount as onComponentMount, onDestroy as onComponentDestroy } from "svelte";

    import { Editor } from "@tiptap/core";
    import useExtensions from "./extensions/useExtensions";
    import Toolbar from "./toolbars/Toolbar.svelte";
    import { useTiptapEditor } from "./hooks";
    import CustomDragHandle from "./elements/CustomDragHandle";
    import LinkBubbleMenu from "./elements/LinkBubbleMenu/LinkBubbleMenu.svelte";
    import TableColumn from "./extensions/Table/menus/TableColumn/TableColumn.svelte";
    import TableRow from "./extensions/Table/menus/TableRow/TableRow.svelte";
    import ImageBlockMenu from "./extensions/ImageBlock/components/ImageBlockMenu.svelte";
    import { defaultContent } from "./contents/defaultContents";
    import Collaboration from "@tiptap/extension-collaboration";
    import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
    import CommentsKit, { hoverOffThread, hoverThread, subscribeToThreads } from "@tiptap-pro/extension-comments";
    import Import from "@tiptap-pro/extension-import";
    import Export from "@tiptap-pro/extension-export";
    import { Button, Modal, Radio, Textarea } from "flowbite-svelte";
    import ThreadList from "./threads/ThreadList/ThreadList.svelte";

    export let provider;
    export let ydoc;

    // Initial content for the editor
    let element;
    let editor;

    const [editorProps, editorActions] = useTiptapEditor();

    const handleCreate = (editorInstance) => {
        if (provider && !provider.isSynced) {
            provider.on("synced", () => {
                setTimeout(() => {
                    if (editorInstance.editor.isEmpty) {
                        editorInstance.editor.commands.setContent(defaultContent);
                    }
                }, 0);
                editorProps.onCreate(editorInstance);
            });
        } else if (editorInstance.editor.isEmpty) {
            editorInstance.editor.commands.setContent(defaultContent);
            editorInstance.editor.commands.focus("start", { scrollIntoView: true });
        }
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

    const convertAppId = import.meta.env.VITE_TIPTAP_CONVERT_APP_ID;
    const convertAppToken = import.meta.env.VITE_TIPTAP_CONVERT_JWT_TOKEN;

    $: threads = [];
    $: showUnresolved = true;
    $: selectedThread = null;
    $: selectedThreads = editor?.storage?.comments?.focusedThreads || [];
    $: filteredThreads = threads.filter((t) => (showUnresolved ? !t.resolvedAt : !!t.resolvedAt));

    const extensions = useExtensions(provider);
    onComponentMount(() => {
        editor = new Editor({
            element,
            extensions: [
                ...extensions,
                provider && ydoc && Collaboration.configure({ document: ydoc }),
                provider && CollaborationCursor.configure({ provider, user: { name: "test", color: "#012345" } }),
                provider &&
                    CommentsKit.configure({
                        provider,
                        useLegacyWrapping: false,
                        onClickThread: (threadId) => {
                            const isResolved = threads.find((t) => t.id === threadId)?.resolvedAt;

                            if (!threadId || isResolved) {
                                selectedThread = null;
                                editor.chain().unselectThread().run();
                                return;
                            }

                            selectedThread = threadId;
                            editor.chain().selectThread({ id: threadId, updateSelection: false }).run();
                        },
                    }),
                convertAppId &&
                    convertAppToken &&
                    Import.configure({
                        appId: convertAppId,
                        token: convertAppToken,
                    }),
                convertAppId &&
                    convertAppToken &&
                    Export.configure({
                        appId: convertAppId,
                        token: convertAppToken,
                    }),
            ],

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
    });

    onComponentDestroy(() => {
        if (editor) {
            editor.destroy();
        }
    });

    onComponentMount(() => {
        const unsubscribe = subscribeToThreads({
            provider,
            callback: (currentThreads) => {
                threads = currentThreads;
            },
        });

        return () => {
            unsubscribe();
        };
    });

    let commentModalState = false;
    let commentValue = "";
    const onComments = (callbackFn) => {
        commentModalState = true;
        callbackFn();
    };

    const handleCreateComment = () => {
        console.log(commentValue);
        if (!commentValue || !editor) return;
        editor
            .chain()
            .focus()
            .setThread({ content: commentValue, commentData: { userName: "test" } })
            .run();
    };
    const onClickThread = (threadId) => {
        const isResolved = threads.find((t) => t.id === threadId)?.resolvedAt;
        if (!threadId || isResolved) {
            selectedThread = null;
            editor.chain().unselectThread().run();
            return;
        }

        selectedThread = threadId;
        editor.chain().selectThread({ id: threadId, updateSelection: false }).run();
        // editor.chain().selectThread({ id: threadId }).run();
    };
    const deleteThread = (threadId) => {
        provider.deleteThread(threadId);
        editor.commands.removeThread({ id: threadId });
    };

    const onHoverThread = (threadId) => {
        console.log("Hover thread", threadId);
        hoverThread(editor, [threadId]);
    };

    const onLeaveThread = () => {
        hoverOffThread(editor);
    };

    const resolveThread = (threadId) => {
        editor.commands.resolveThread({ id: threadId });
    };

    const unresolveThread = (threadId) => {
        editor.commands.unresolveThread({ id: threadId });
    };
</script>

<div class="w-screen h-screen bg-background text-text" data-viewmode={showUnresolved ? "open" : "resolved"}>
    <div class="h-full flex flex-col border border-border-toolbar text-text overflow-hidden">
        {#if editor}
            <Toolbar className="mx-auto flex-0 relative z-10 w-full bg-background-toolbar border-b border-b-border-toolbar" {editor} {onInsertBelow} {onInsertAbove} {onReplace} />
            <CustomDragHandle {editor} {onComments} />
            <LinkBubbleMenu {editor} />
            <TableColumn {editor} />
            <TableRow {editor} />
            <ImageBlockMenu {editor} />
        {/if}

        <div class="flex-1 relative z-0 w-full overflow-y-auto flex">
            <div class="flex-1 w-full h-full scrollbar" bind:this={element} spellcheck="false"></div>

            {#if threads.length !== 0}
                <div class="flex-0 w-64 px-2 py-16">
                    <h2 class="mb-2">Comments</h2>

                    <div class="mb-2">
                        <Radio name="thread-state" bind:group={showUnresolved} value={true} inline class="me-2">Open</Radio>
                        <Radio name="thread-state" bind:group={showUnresolved} value={false} inline class="me-2">Resolved</Radio>
                    </div>

                    <ThreadList
                        {provider}
                        threads={filteredThreads}
                        {selectedThread}
                        {selectedThreads}
                        {onClickThread}
                        {deleteThread}
                        {onHoverThread}
                        {onLeaveThread}
                        {resolveThread}
                        {unresolveThread} />
                </div>
            {/if}
        </div>
        <!-- <div class="flex-1 relative z-0 w-full px-10 py-5 overflow-y-auto scrollbar" bind:this={element} spellcheck="false"></div> -->
    </div>
</div>

<Modal bind:open={commentModalState} size="xs" autoclose>
    <h3>Comments</h3>

    <Textarea id="textarea-id" class="mt-2" placeholder="Add a comment..." rows="4" name="message" bind:value={commentValue} />
    <div class="flex justify-end items-center text-center gap-2">
        <Button color="blue" onclick={handleCreateComment}>Ok</Button>
        <Button color="alternative">Cancel</Button>
    </div>
</Modal>
