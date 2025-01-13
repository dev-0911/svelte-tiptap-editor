<script>
    import { Dropdown as FlowbiteDropdown } from "flowbite-svelte";
    let { className, children, open, onshow, ...rest } = $props();
</script>

<FlowbiteDropdown bind:open {onshow} class="dropdown-list" {...rest}>
    {#if children}
        {@render children()}
    {/if}
</FlowbiteDropdown>
