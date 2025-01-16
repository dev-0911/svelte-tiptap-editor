<script>
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

<div>
    <Textarea placeholder="Reply to thread …" bind:value={comment} unWrappedClass="mb-1 p-1 text-xs" />
    <div class="flex justify-start items-center">
        <Button color="blue" class="px-2 py-1 text-xs" disabled={!comment.length} onclick={handleSubmit}>Send</Button>
    </div>
</div>
