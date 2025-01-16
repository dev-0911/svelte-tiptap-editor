<script>
    import cn from "classnames";
    import CmdEditIcon from "$components/assets/svg/editor/CmdEditIcon.svelte";
    import MoreHorizontalIcon from "$components/assets/svg/editor/MoreHorizontalIcon.svelte";
    import TrashIcon from "$components/assets/svg/editor/TrashIcon.svelte";
    import UserIcon from "$components/assets/svg/editor/UserIcon.svelte";
    import Dropdown from "$components/shared/Dropdown/ui/Dropdown/Dropdown.svelte";
    import DropdownItem from "$components/shared/Dropdown/ui/DropdownItem/DropdownItem.svelte";

    let { comment, onDelete, onEdit } = $props();

    let { id, content, data, createdAt, deletedAt } = comment;
    let { username, avatarUrl, color } = data;

    let composeValue = $state(content);
    let deleted = $derived(!!deletedAt);

    let hoverState = $state(false);
    let dropdownState = $state(false);

    let isComposing = $state(false);

    const onMouseEnter = () => {
        hoverState = true;
    };
    const onMouseLeave = () => {
        hoverState = false;
        dropdownState = false;
    };
</script>

{#snippet editIcon()}
    <CmdEditIcon />
{/snippet}
{#snippet deleteIcon()}
    <TrashIcon />
{/snippet}

<div class="relative" role="button" tabindex="0" aria-label="Hoverable box" onmouseenter={onMouseEnter} onmouseleave={onMouseLeave}>
    <div class={cn("absolute top-1 right-1", hoverState ? "visible" : "invisible")}>
        <div class="flex items-center justify-start">
            <button
                onclick={() => {
                    dropdownState = true;
                }}>
                <MoreHorizontalIcon />
            </button>

            <Dropdown bind:open={dropdownState}>
                <DropdownItem
                    before={editIcon}
                    onclick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        isComposing = true;
                    }}>
                    Edit comment
                </DropdownItem>

                <DropdownItem
                    before={deleteIcon}
                    onclick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onDelete(id);
                    }}>
                    Delete comment
                </DropdownItem>
            </Dropdown>
        </div>
    </div>

    <div class="p-2">
        <div class="mb-2 flex items-center justify-start gap-2">
            {#if avatarUrl}
                <img src={avatarUrl} alt={username} width="24px" height="24px" class="rounded-full" />
            {:else}
                <UserIcon width="24px" height="24px" />
            {/if}

            <div class="font-bold">{username}</div>
            <div class="text-sm">{new Date(createdAt).toLocaleTimeString()}</div>
        </div>

        {#if !isComposing && !deleted}
            <div class="text-sm ml-8">
                {content}
            </div>
        {/if}

        {#if isComposing && !deleted}
            <div class="comment-edit">
                <Textarea type="text" bind:value={composeValue} unWrappedClass="mb-1 p-1 text-xs" />

                <div class="flex justify-start items-center gap-1">
                    <button
                        class="px-2 py-1 text-xs"
                        color="blue"
                        type="reset"
                        onclick={() => {
                            isComposing = false;
                        }}>
                        Cancel
                    </button>

                    <button
                        class="px-2 py-1 text-xs"
                        color="blue"
                        onclick={() => {
                            isComposing = false;
                            onEdit?.(id, composeValue);
                        }}
                        disabled={!composeValue.length || composeValue === content}>
                        Accept
                    </button>
                </div>
            </div>
        {/if}
    </div>
</div>
