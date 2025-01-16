<script>
    import { ToolbarButton } from "$components/shared/Toolbar";
    import CommentIcon from "$components/assets/svg/editor/CommentIcon.svelte";
    import { tiptapStorage } from "$lib/storage/tiptapStorage";

    const onClick = () => {
        if ($tiptapStorage.showComments) $tiptapStorage.showComments = false;
        else $tiptapStorage.showComments = true;
    };
</script>

<ToolbarButton actived={tiptapStorage.showComments} onclick={onClick} hint="Comments"><CommentIcon /></ToolbarButton>
