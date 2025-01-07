<script>
    import cn from "classnames";

    let { id, active, open, children, onClick, onClickOutside } = $props();

    let element = $state(null);

    const handleClick = () => {
        if (onClick) {
            onClick(id);
        }
    };

    $effect(() => {
        if (!active) {
            return () => null;
        }

        const clickHandler = onClickOutside
            ? (event) => {
                  if (!cardRef.current) {
                      return;
                  }

                  if (!cardRef.current.contains(event.target)) {
                      onClickOutside();
                  }
              }
            : null;

        if (clickHandler) {
            document.addEventListener("click", clickHandler);
        }

        return () => {
            if (clickHandler) {
                document.removeEventListener("click", clickHandler);
            }
        };
    });
</script>

<div
    bind:this={element}
    class={cn(open && "border-border-focused", active && "is-active")}
    onclick={handleClick}
    role="button"
    tabindex="0"
    onkeydown={(event) => (event.key === "Enter" || event.key === "" ? handleClick() : null)}>
    {#if children}
        {@render children()}
    {/if}
</div>
