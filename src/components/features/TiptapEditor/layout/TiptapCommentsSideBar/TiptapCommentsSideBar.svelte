<script>
    import { onMount } from "svelte";
    import { Button } from "flowbite-svelte";
    import { subscribeToThreads } from "@tiptap-pro/extension-comments";

    import { Dropdown, DropdownDivider, DropdownItem } from "$components/shared/Dropdown";

    import { useThread } from "../../hooks";
    import { ThreadList, ThreadModalItem } from "../../threads";

    import CheckIcon from "$components/assets/svg/editor/CheckIcon.svelte";
    import FilterIcon from "$components/assets/svg/editor/FilterIcon.svelte";
    import { tiptapStorage } from "$lib/storage/tiptapStorage";

    let { provider, editor } = $props();

    let threads = $state([]);

    onMount(() => {
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

    let selectedThread = $state(null);
    let selectedThreads = $derived(editor?.storage?.comments?.focusedThreads || []);
    let showResolved = $derived($tiptapStorage.showResolved);
    let filteredThreads = $derived(threads.filter((t) => (showResolved ? !!t.resolvedAt : !t.resolvedAt)));

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

    const { onHoverThread, onLeaveThread, resolveThread, unresolveThread, deleteThread } = useThread(provider, editor);
</script>

{#snippet after()}
    <CheckIcon />
{/snippet}

<div class="w-64 p-3">
    <div class="mb-2 flex justify-between items-center">
        <div class="text-2xl font-bold">Comments</div>

        <button>
            <FilterIcon />
        </button>

        <Dropdown placement="bottom-right">
            <DropdownItem
                after={showResolved === false && after}
                onclick={() => {
                    $tiptapStorage.showResolved = false;
                }}>
                Open
            </DropdownItem>

            <DropdownItem
                after={showResolved === true && after}
                onclick={() => {
                    $tiptapStorage.showResolved = true;
                }}>
                Resolved
            </DropdownItem>
        </Dropdown>
    </div>

    {#each threads as thread, index}
        {#if index !== 0}
            <DropdownDivider direction="horizontal" />
        {/if}
        <ThreadModalItem size="md" threadId={thread.id} {provider} {editor}></ThreadModalItem>
    {/each}

    <!-- 
    <ThreadList
        {provider}
        threads={filteredThreads}
        {selectedThread}
        {selectedThreads}
        {onHoverThread}
        {onLeaveThread}
        {onClickThread}
        {deleteThread}
        {resolveThread}
        {unresolveThread} /> -->
</div>
