<script>
    import { EmojiItem } from "@tiptap-pro/extension-emoji";
    import { onMount } from "svelte";

    export let editor, range, items;
    $: selectedIndex = 0;
    let elements = [];
    $: {
        if (elements[0] != null) {
            elements[selectedIndex]?.scrollIntoView({
                block: "nearest",
                behavior: "smooth",
            });
        }
    }

    const upHandler = () => {
        const newIndex = (selectedIndex + props.items.length - 1) % props.items.length;
        selectedIndex = newIndex;
        scrollIntoView(newIndex);
        e.preventDefault();
    };

    const downHandler = () => {
        const newIndex = (selectedIndex + 1) % props.items.length;
        selectedIndex = newIndex;
        scrollIntoView(newIndex);
        e.preventDefault();
    };

    const enterHandler = () => {
        const item = items[selectedIndex];

        if (item) {
            item.command({ editor, range });
        }
    };

    function handleKeydown(e) {
        if (e.key === "ArrowUp") {
            upHandler();
            return true;
        }

        if (e.key === "ArrowDown") {
            downHandler();
            selectedIndex = (selectedIndex + 1) % items.length;
            return true;
        }

        if (e.key === "Enter") {
            enterHandler();
            e.preventDefault();

            return true;
        }
    }
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="border bg-white shadow-xl w-96 h-96 max-w-full rounded-lg overflow-scroll z-50">
    <div class="p-2 text-sm text-gray-500">BLOCKS</div>
    <ul
        class="mt-2 divide-y divide-gray-200 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        tabindex="-1"
        role="listbox"
        aria-labelledby="slash-command-menu"
        aria-activedescendant="listbox-option-0">
        {#each items as { title, subtitle, command }, i}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
            <li
                class="text-gray-900 select-none p-4 text-sm cursor-pointer {i == selectedIndex ? 'bg-gray-100' : 'bg-white'}"
                id="listbox-option-0"
                on:mouseenter={() => (selectedIndex = i)}
                on:click={() => {
                    command({ editor, range });
                }}
                bind:this={elements[i]}>
                <div class="flex flex-col">
                    <div class="flex justify-between">
                        <p class="font-normal">{title}</p>
                    </div>
                    <p class="text-gray-500 mt-2">{subtitle}</p>
                </div>
            </li>
        {/each}
    </ul>
</div>

<!-- const EmojiList = forwardRef(
  (props: EmojiListProps, ref: ForwardedRef<{ onKeyDown: (evt: SuggestionKeyDownProps) => boolean }>) => {
    const [selectedIndex, setSelectedIndex] = useState(0)

    useEffect(() => setSelectedIndex(0), [props.items])

    const selectItem = useCallback(
      (index: number) => {
        const item = props.items[index]

        if (item) {
          props.command({ name: item.name })
        }
      },
      [props],
    )

    useImperativeHandle(ref, () => {
      const scrollIntoView = (index: number) => {
        const item = props.items[index]

        if (item) {
          const node = document.querySelector(`[data-emoji-name="${item.name}"]`)

          if (node) {
            node.scrollIntoView({ block: 'nearest' })
          }
        }
      }

      const upHandler = () => {
        const newIndex = (selectedIndex + props.items.length - 1) % props.items.length
        setSelectedIndex(newIndex)
        scrollIntoView(newIndex)
      }

      const downHandler = () => {
        const newIndex = (selectedIndex + 1) % props.items.length
        setSelectedIndex(newIndex)
        scrollIntoView(newIndex)
      }

      const enterHandler = () => {
        selectItem(selectedIndex)
      }

      return {
        onKeyDown: ({ event }) => {
          if (event.key === 'ArrowUp') {
            upHandler()
            return true
          }

          if (event.key === 'ArrowDown') {
            downHandler()
            return true
          }

          if (event.key === 'Enter') {
            enterHandler()
            return true
          }

          return false
        },
      }
    }, [props, selectedIndex, selectItem])

    const createClickHandler = useCallback((index: number) => () => selectItem(index), [selectItem])

    if (!props.items || !props.items.length) {
      return null
    }

    return (
      <Panel className="overflow-y-auto max-w-[18rem] max-h-[18rem]">
        {props.items.map((item: EmojiItem, index: number) => (
          <Button
            active={index === selectedIndex}
            variant="ghost"
            className="justify-start w-full"
            buttonSize="small"
            key={item.name}
            onClick={createClickHandler(index)}
            data-emoji-name={item.name}
          >
            {item.fallbackImage ? <img src={item.fallbackImage} className="w-5 h-5" alt="emoji" /> : item.emoji}{' '}
            <span className="truncate text-ellipsis">:{item.name}:</span>
          </Button>
        ))}
      </Panel>
    )
  }, -->
)
