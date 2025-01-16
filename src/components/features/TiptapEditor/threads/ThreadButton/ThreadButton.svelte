<script>
    import { Button, Modal } from "flowbite-svelte";
    import CommentIcon from "$components/assets/svg/editor/CommentIcon.svelte";
    import ThreadModalItem from "../ThreadModalItem/ThreadModalItem.svelte";
    import Divider from "$components/shared/Divider/Divider.svelte";
    import { DropdownDivider } from "$components/shared/Dropdown";

    const { provider, editor, threadIds } = $props();

    let commentsCnt = $state(0);

    $effect(() => {
        commentsCnt = threadIds?.reduce((res, threadId) => {
            return res + provider.getThreadComments(threadId, true).length;
        }, 0);
    });

    let modalState = $state(false);
</script>

<button
    class="flex items-center justify-start gap-2"
    onclick={() => {
        modalState = true;
    }}>
    <CommentIcon width="14px" height="14px" />
    {commentsCnt}
</button>

<Modal size="md" bind:open={modalState} classBody="max-h-[400px] rounded-lg" outsideclose dismissable={false}>
    <svelte:fragment slot="header"></svelte:fragment>
    {#each threadIds as threadId, index}
        {#if index !== 0}
            <DropdownDivider direction="horizontal" />
        {/if}
        <ThreadModalItem size="md" {threadId} {provider} {editor}></ThreadModalItem>
    {/each}
    <svelte:fragment slot="footer"></svelte:fragment>
</Modal>

<!-- <div
    class={cn(className, "text-xs")}
    data-node-id={thread.id}
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
</div> -->
