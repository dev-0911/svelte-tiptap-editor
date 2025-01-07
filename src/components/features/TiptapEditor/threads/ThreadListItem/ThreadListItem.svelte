<script>
    import cn from "classnames";
    import { Button } from "flowbite-svelte";
    import CommentCard from "../CommentCard/CommentCard.svelte";
    import ThreadCard from "../ThreadCard/ThreadCard.svelte";
    import ThreadComposer from "../ThreadComposer/ThreadComposer.svelte";

    const { thread, provider, active, open, onClickThread, deleteThread, onHoverThread, onLeaveThread, resolveThread, unresolveThread, className } = $props();
    const comments = $derived(provider.getThreadComments(thread.id, true));
    const firstComment = $derived(comments && comments[0]);

    const handleDeleteClick = () => {
        deleteThread(thread.id);
    };

    const handleResolveClick = () => {
        resolveThread(thread.id);
    };

    const handleUnresolveClick = () => {
        unresolveThread(thread.id);
    };

    const editComment = (commentId, val) => {
        provider.updateComment(thread.id, commentId, { content: val });
    };

    const deleteComment = (commentId) => {
        provider.deleteComment(thread.id, commentId, { deleteContent: true });
    };
</script>

<div
    class={cn(className, "text-xs")}
    onmouseenter={() => onHoverThread(thread.id)}
    onmouseleave={() => onLeaveThread()}
    tabindex={0}
    role="button"
    aria-label="Hover to see additional information">
    <ThreadCard id={thread.id} {active} {open} onClick={!open ? onClickThread : null}>
        {#if open}
            <div class="mb-2 pb-2 border-b border-solid border-border flex justify-start items-center gap-1">
                {#if !thread.resolvedAt}
                    <Button color="blue" class="px-2 py-1 text-xs" onclick={handleResolveClick}>✓ Resolve</Button>
                {:else}
                    <Button color="blue" class="px-2 py-1 text-xs" onclick={handleUnresolveClick}>⟲ Unresolve</Button>
                {/if}
                <Button color="blue" class="px-2 py-1 text-xs" onclick={handleDeleteClick}>× Delete</Button>
            </div>

            {#if thread.resolvedAt}
                <div class="mb-2 text-xs">
                    💡 Resolved at{" "}
                    {new Date(thread.resolvedAt).toLocaleDateString()}{" "}
                    {new Date(thread.resolvedAt).toLocaleTimeString()}
                </div>
            {/if}

            <div class="mb-2 flex flex-col gap-2">
                {#each comments as comment}
                    <CommentCard
                        key={comment.id}
                        name={comment.data.userName}
                        content={comment.deletedAt ? null : comment.content}
                        createdAt={comment.createdAt}
                        deleted={comment.deletedAt}
                        onEdit={(val) => {
                            if (val) {
                                editComment(comment.id, val);
                            }
                        }}
                        onDelete={() => {
                            deleteComment(comment.id);
                        }}
                        showActions={true} />
                {/each}
            </div>

            <div>
                <ThreadComposer threadId={thread.id} {provider} />
            </div>
        {/if}

        {#if !open && firstComment && firstComment.data}
            <div class="comments-group">
                <CommentCard
                    key={firstComment.id}
                    name={firstComment.data.userName}
                    content={firstComment.content}
                    createdAt={firstComment.createdAt}
                    deleted={firstComment.deletedAt}
                    onEdit={(val) => {
                        if (val) {
                            editComment(firstComment.id, val);
                        }
                    }} />

                <div>
                    {Math.max(0, comments.length - 1) || 0}{" "}
                    {(comments.length - 1 || 0) === 1 ? "reply" : "replies"}
                </div>
            </div>
        {/if}
    </ThreadCard>
</div>
