<script>
    import cn from "classnames";
    import "../Dropdown.css";

    const { actived, disabled, onclick, before, after, children, size, className } = $props();
</script>

<button data-size={size} class={cn(className, "dropdown-button w-full flex justify-start items-center gap-2", actived && "actived", disabled && "disabled")} {onclick} {disabled}>
    <div class="flex-0">
        {#if before}
            {@render before()}
        {/if}
    </div>
    <div class="flex-1">
        {#if children}
            {@render children()}
        {/if}
    </div>
    <div class="flex-0">
        {#if after}
            {@render after()}
        {/if}
    </div>
</button>
