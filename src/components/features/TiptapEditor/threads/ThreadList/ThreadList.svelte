<script>
    import ThreadListItem from "../ThreadListItem/ThreadListItem.svelte";

    const { provider, threads, selectedThreads, selectedThread, onClickThread, deleteThread, onHoverThread, onLeaveThread, resolveThread, unresolveThread, className } = $props();
</script>

<div>
    {#if threads.length === 0}
        <div class="label">No threads.</div>
    {/if}
    <div class="flex flex-col gap-2">
        {#each threads as thread}
            <ThreadListItem
                key={thread.id}
                className="border border-solid border-border rounded-md p-2"
                {provider}
                {thread}
                active={selectedThreads.includes(thread?.id) || selectedThread === thread?.id}
                open={selectedThread === thread?.id}
                {onClickThread}
                {deleteThread}
                {onHoverThread}
                {onLeaveThread}
                {resolveThread}
                {unresolveThread} />
        {/each}
    </div>
</div>
