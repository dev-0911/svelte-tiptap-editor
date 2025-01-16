<script>
    import { Button } from "flowbite-svelte";
    import { CommentCard } from "../CommentCard";
    import { ThreadComposer } from "../ThreadComposer";
    import { ThreadModalComment } from "../ThreadModalComment";
    import { ThreadModalComposer } from "../ThreadModalComposer";

    let { provider, editor, threadId } = $props();

    const comments = $derived(provider.getThreadComments(threadId, true));
    const thread = $derived(provider.getThread(threadId));
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

<div>
    {#if open}
        {#each comments as comment}
            <ThreadModalComment {comment} onDelete={deleteComment} onEdit={editComment} />
        {/each}
        <!-- <div class="relative">
            <div class="absolute top-2 right-2 border border-solid border-border rounded-md">
                {#if !thread.resolvedAt}
                    <Button color="blue" class="px-2 py-1 text-xs">✓</Button>
                {:else}
                    <Button color="blue" class="px-2 py-1 text-xs">⟲</Button>
                {/if}
                <Button color="blue" class="px-2 py-1 text-xs">× Delete</Button>
            </div>
        </div> -->
        <!-- <div class="mb-2 pb-2 border-b border-solid border-border flex justify-start items-center gap-1">
            {#if !thread.resolvedAt}
                <Button color="blue" class="px-2 py-1 text-xs">✓ Resolve</Button>
            {:else}
                <Button color="blue" class="px-2 py-1 text-xs">⟲ Unresolve</Button>
            {/if}
            <Button color="blue" class="px-2 py-1 text-xs">× Delete</Button>
        </div> -->

        <!-- {#if thread.resolvedAt}
            <div class="mb-2 text-xs">
                💡 Resolved at{" "}
                {new Date(thread.resolvedAt).toLocaleDateString()}{" "}
                {new Date(thread.resolvedAt).toLocaleTimeString()}
            </div>
        {/if} -->

        <!-- <div class="mb-2 flex flex-col gap-2">
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
        </div> -->

        <div>
            <ThreadModalComposer threadId={thread.id} {provider} />
        </div>
    {/if}

    <!-- {#if !open && firstComment && firstComment.data}
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
    {/if} -->
</div>
