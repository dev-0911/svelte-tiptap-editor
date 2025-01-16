<script>
    import UserIcon from "$components/assets/svg/editor/UserIcon.svelte";
    import { userProfile } from "$lib/storage/userProfile";
    import { Button, Textarea } from "flowbite-svelte";

    const { threadId, provider } = $props();

    let comment = $state("");

    const { username, avatarUrl, color } = $userProfile;

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!comment) {
            return;
        }

        if (provider) {
            provider.addComment(threadId, {
                content: comment,
                createdAt: Date.now(),
                updatedAt: Date.now(),
                data: { username, avatarUrl, color },
            });

            comment = "";
        }
    };
</script>

<div class="p-2">
    <div class="mb-2 flex items-start justify-start gap-2">
        {#if avatarUrl}
            <img src={avatarUrl} alt={username} width="24px" height="24px" class="rounded-full" />
        {:else}
            <UserIcon width="24px" height="24px" />
        {/if}
        <div class="font-bold">
            {username}
        </div>
    </div>

    <div class="ml-8 mb-2">
        <Textarea placeholder="Reply to thread …" bind:value={comment} unWrappedClass="p-1 text-xs" />
    </div>

    <div class="flex justify-end items-center">
        <Button color="blue" class="px-2 py-1 text-xs" disabled={!comment.length} onclick={handleSubmit}>Send</Button>
    </div>
</div>
