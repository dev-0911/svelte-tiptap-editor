<script>
    import cn from "classnames";
    let { direction } = $props();
</script>

<div class={cn("dropdown-divider", direction === "horizontal" && "horizontal")}></div>

<style>
    .dropdown-divider {
        width: 1px;
        height: 16px;
        background-color: var(--border-color-bubble-menu) !important;
        &.horizontal {
            width: 100%;
            height: 1px;
        }
    }
</style>
