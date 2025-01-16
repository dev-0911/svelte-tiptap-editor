<script>
    import { onMount } from "svelte";

    import { subscribeToThreads } from "@tiptap-pro/extension-comments";

    import { useThread } from "../../hooks";
    import { ThreadButton } from "../../threads";
    import { tiptapStorage } from "$lib/storage/tiptapStorage";

    let { provider, editor } = $props();

    let showResolved = $tiptapStorage.showResolved;

    let threads = $state([]);
    let groupedThreads = $state([]);

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

    onMount(() => {
        const updatePositions = () => {
            let groupedIds = [];
            document.querySelectorAll("[data-thread-id]").forEach((node) => {
                const id = node.getAttribute("data-thread-id");

                const rectY = node.getBoundingClientRect().top;

                if (groupedIds.find(({ y }) => y === rectY)) {
                    groupedIds = groupedIds.map(({ y, ids }) => {
                        if (y === rectY) {
                            return { y, ids: [...ids, id] };
                        } else {
                            return { y, ids };
                        }
                    });
                } else {
                    groupedIds.push({ y: rectY, ids: [id] });
                }
            });
            groupedThreads = groupedIds;
        };

        updatePositions();

        document.addEventListener("resize", updatePositions);
        document.addEventListener("updatePositionEvent", updatePositions);

        return () => {
            document.removeEventListener("resize", updatePositions);
            document.removeEventListener("updatePositionEvent", updatePositions);
        };
    });
</script>

<div class="fixed top-0 right-0 w-64">
    {#each groupedThreads as groupedThread}
        <div class="absolute right-0 w-64" style={`top: ${groupedThread.y}px`}>
            <ThreadButton threadIds={groupedThread.ids} {provider} {editor}></ThreadButton>
        </div>
    {/each}
</div>
