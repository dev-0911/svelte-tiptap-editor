<script>
    import { onMount as onComponentMount, onDestroy as onComponentDestroy } from "svelte";

    import { Editor } from "@tiptap/core";
    import useExtensions from "./extensions/useExtensions";
    import Toolbar from "./toolbars/Toolbar.svelte";
    import { useTiptapEditor } from "./hooks";
    import CustomDragHandle from "./elements/CustomDragHandle";

    import TableColumn from "./extensions/Table/menus/TableColumn/TableColumn.svelte";
    import TableRow from "./extensions/Table/menus/TableRow/TableRow.svelte";
    import { defaultContent } from "./contents/defaultContents";
    import Collaboration from "@tiptap/extension-collaboration";
    import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
    import CommentsKit, { hoverOffThread, hoverThread, subscribeToThreads } from "@tiptap-pro/extension-comments";
    import Import from "@tiptap-pro/extension-import";
    import Export from "@tiptap-pro/extension-export";
    import { Button, Modal, Radio, Textarea } from "flowbite-svelte";
    import ThreadList from "./threads/ThreadList/ThreadList.svelte";
    import Ai from "@tiptap-pro/extension-ai";
    import { useTiptapAi } from "./hooks/useTiptapAi.svelte";
    import { ImageBlockMenu, LinkBubbleMenu, MathBlockMenu } from "./extensions";
    import { TiptapCommentsSideBar, TiptapCommentsLiveBar, TiptapPlugins } from "./layout";
    import { tiptapStorage } from "$lib/storage/tiptapStorage";
    import { userProfile } from "$lib/storage/userProfile";

    export let provider;
    export let ydoc;
    export let convertAppId;
    export let convertToken;
    export let aiToken;
    export let aiAppId;

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

    $: threads = [];
    $: selectedThread = null;

    const extensions = useExtensions(provider);

    const { aiData, aiResponse, aiState, onLoading, onChunk, onSuccess, onError } = useTiptapAi();
    const { username, color, avatarUrl } = $userProfile;
    onComponentMount(() => {
        editor = new Editor({
            element,
            extensions: [
                ...extensions,
                provider && ydoc && Collaboration.configure({ document: ydoc }),
                provider && CollaborationCursor.configure({ provider, user: { name: username, color } }),
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
                    convertToken &&
                    Import.configure({
                        appId: convertAppId,
                        token: convertToken,
                    }),
                convertAppId &&
                    convertToken &&
                    Export.configure({
                        appId: convertAppId,
                        token: convertToken,
                    }),
                aiToken &&
                    Ai.configure({
                        // Your Tiptap Content AI app id
                        appId: aiAppId,
                        // This needs to be your generated JWT and MUST NOT be the OpenAI API key!
                        token: aiToken,
                        autocompletion: true,
                        // … other options (see below)
                        onLoading,
                        onSuccess,
                        onChunk,
                        onError,
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
        const updatePositions = () => {
            const updatePositionEvent = new CustomEvent("updatePositionEvent");
            document.dispatchEvent(updatePositionEvent);
        };
        updatePositions();

        element.addEventListener("scroll", updatePositions);
        return () => {
            element.removeEventListener("scroll", updatePositions);
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
        editor.chain().focus().setThread({ content: commentValue, commentData: { username, avatarUrl, color } }).run();
    };
</script>

<div class="relative w-screen h-screen bg-background text-text" data-viewmode={$tiptapStorage.showResolved ? "resolved" : "open"}>
    <div class="h-full flex flex-col border border-border-toolbar text-text overflow-hidden">
        {#if editor}
            <Toolbar
                className="mx-auto flex-0 relative z-10 w-full bg-background-toolbar border-b border-b-border-toolbar"
                {editor}
                {onInsertBelow}
                {onInsertAbove}
                {onReplace}
                {aiData}
                {aiResponse}
                {aiState} />
            <CustomDragHandle {editor} {onComments} />
        {/if}

        <div class="flex-1 relative z-0 w-full overflow-hidden">
            <div class="w-full h-full flex">
                <div class="relative flex-1 h-full overflow-y-auto scrollbar" bind:this={element} spellcheck="false"></div>
                {#if editor && $tiptapStorage.showComments}
                    <div class="flex-0 h-full overflow-y-auto scrollbar border-l border-solid border-l-border">
                        <TiptapCommentsSideBar {provider} {editor} />
                    </div>
                {/if}
            </div>

            {#if editor && !$tiptapStorage.showComments}
                <TiptapCommentsLiveBar {provider} {editor} />
            {/if}
        </div>
    </div>
</div>

{#if editor}
    <TiptapPlugins {editor} />
{/if}

<Modal bind:open={commentModalState} size="xs" autoclose>
    <h3>Comments</h3>

    <Textarea id="textarea-id" class="mt-2" placeholder="Add a comment..." rows="4" name="message" bind:value={commentValue} />
    <div class="flex justify-end items-center text-center gap-2">
        <Button color="blue" onclick={handleCreateComment}>Ok</Button>
        <Button color="alternative">Cancel</Button>
    </div>
</Modal>
