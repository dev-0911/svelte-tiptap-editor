<script>
    import { onMount, onDestroy } from "svelte";
    import cn from "classnames";
    import LogoIcon from "$components/assets/svg/LogoIcon.svelte";
    import { Button, Card, Dropdown, DropdownItem, Input, Spinner } from "flowbite-svelte";
    import { fade } from "svelte/transition";

    import { offset, flip, shift } from "svelte-floating-ui/dom";
    import { createFloatingActions } from "svelte-floating-ui";
    import PencilIcon from "$components/assets/svg/ai/PencilIcon.svelte";
    import SummarizeIcon from "$components/assets/svg/ai/SummarizeIcon.svelte";
    import TranslateIcon from "$components/assets/svg/ai/TranslateIcon.svelte";
    import LongIcon from "$components/assets/svg/ai/LongIcon.svelte";
    import SimplifyIcon from "$components/assets/svg/ai/SimplifyIcon.svelte";
    import ReplaceIcon from "$components/assets/svg/ai/ReplaceIcon.svelte";
    import ImproveIcon from "$components/assets/svg/ai/ImproveIcon.svelte";
    import ChevronRightIcon from "$components/assets/svg/editor/ChevronRightIcon.svelte";
    import AiIcon from "$components/assets/svg/editor/AIIcon.svelte";
    import CheckIcon from "$components/assets/svg/editor/CheckIcon.svelte";
    import PlusIcon from "$components/assets/svg/editor/PlusIcon.svelte";
    import TrashIcon from "$components/assets/svg/editor/TrashIcon.svelte";
    import { suggestionTemplates, suggestionCommands } from "./constant";
    import SharedDropdownButton from "$components/shared/SharedDropdownButton/SharedDropdownButton.svelte";

    export let editor;
    export let onReplace;
    export let onInsertAbove;
    export let onInsertBelow;

    const API_URL = "https://steam.buntod.com/api/ai/prompt";
    const TOKEN = import.meta.env.VITE_AWS_TOKEN;

    let button;
    let inputMenu;
    let selectMenu;

    let command = null;
    let content = null;
    let from = null;
    let to = null;

    let searchQuery = "";
    let data = null;
    let loading = false;
    let error = null;

    $: showTooltip = false;
    $: filteredTemplates = !searchQuery.length ? suggestionTemplates : suggestionTemplates.filter((template) => template.toLowerCase().includes(searchQuery.toLowerCase()));
    $: filteredCommands = !searchQuery.length ? suggestionCommands : suggestionCommands.filter((template) => template.toLowerCase().includes(searchQuery.toLowerCase()));
    $: tone = "Formal";
    let contents = [];

    const initDropdown = () => {
        command = null;
        content = null;
        from = null;
        to = null;

        searchQuery = "";
        data = null;
        loading = false;
        error = null;
        contents = [];
    };

    const handleClick = () => {
        showTooltip = !showTooltip;
        initDropdown();
    };

    const handleClickOutside = (event) => {
        if (!inputMenu || !selectMenu || !button) return;
        if (button.contains(event.target)) return;
        if (inputMenu.contains(event.target) || selectMenu.contains(event.target)) return;

        event.stopPropagation();
        showTooltip = false;
        initDropdown();
    };

    onMount(() => {
        // Attach event listener
        document.addEventListener("click", handleClickOutside);
    });

    onDestroy(() => {
        // Cleanup event listener
        document.removeEventListener("click", handleClickOutside);
    });

    const [floatingRef, floatingContent] = createFloatingActions({
        strategy: "absolute",
        placement: "bottom",
        middleware: [offset(8), flip(), shift()],
    });

    async function handleGenerateAiText(command, content) {
        loading = true; // Set loading state
        error = null; // Reset error state
        data = null; // Reset data state
        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    Authorization: `bearer ${TOKEN}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ command, tone, content }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            data = await response.json();
        } catch (err) {
            error = err.message;
            console.log(error);
        } finally {
            loading = false; // Reset loading state
        }
    }

    async function handleGenerateFromButton(ev) {
        from = editor.state.selection.from;
        to = editor.state.selection.to;
        content = editor.state.doc.textBetween(from, to, " ");
        const language = ev.currentTarget.dataset.value;

        command = "assistant";

        ev.stopPropagation();

        searchQuery = "";
        await handleGenerateAiText(command, content);
    }

    async function handleTranslate(ev) {
        from = editor.state.selection.from;
        to = editor.state.selection.to;
        content = editor.state.doc.textBetween(from, to, " ");
        command = ev.currentTarget.dataset.command;

        command = "assistant";

        ev.stopPropagation();

        searchQuery = "";
        await handleGenerateAiText(command, content);
    }

    async function handleGenerateFromInput(ev) {
        if (!searchQuery.length) return;
        from = editor.state.selection.from;
        to = editor.state.selection.to;
        content = editor.state.doc.textBetween(from, to, " ");
        command = ev.currentTarget.dataset.command;

        command = "assistant";

        tone = "default";

        ev.stopPropagation();

        searchQuery = "";
        await handleGenerateAiText(command, content, tone);
    }

    function handleChangeTone() {
        tone = ev.target.dataset.value;
    }

    function handleReplaceContent() {
        if (!data?.content) return;
        onReplace(data.content);
        showTooltip = false;
        initDropdown();
    }

    function handleInsertAboveContent() {
        if (!data?.content) return;
        onInsertAbove(data.content);
        showTooltip = false;
        initDropdown();
    }

    function handleInsertBelowContent() {
        if (!data?.content) return;
        onInsertBelow(data.content);
        showTooltip = false;
        initDropdown();
    }

    async function handleRetryContent() {
        await handleGenerateAiText(command, content, tone);
    }

    function handleDiscardContent() {
        showTooltip = false;
        initDropdown();
    }
</script>

<button
    use:floatingRef
    bind:this={button}
    on:click={handleClick}
    disabled={editor.state.selection.empty}
    class={cn(
        "min-w-32 p-1 flex justify-center items-center gap-2 bg-background-toolbar hover:bg-background-toolbar-hovered text-text-toolbar text-sm rounded-sm",
        !editor.state.selection.empty ? "bg-background-toolbar-focused hover:bg-background-hovered text-text-toolbar-focused" : "bg-background-toolbar text-text-toolbar",
        showTooltip ? "border border-solid border-primary" : "border border-solid border-transparent",
    )}>
    <LogoIcon width="20px" height="20px" />STEAMid AI
</button>

{#if showTooltip}
    <div use:floatingContent class="w-full p-2" transition:fade={{ duration: 200 }}>
        <div class="relative z-10">
            <div bind:this={inputMenu} class="mb-2 bg-white border border-solid border-border rounded-md !text-sm drop-shadow-md">
                {#if !loading}
                    <Input
                        type="text"
                        bind:value={searchQuery}
                        placeholder="AI Commands can generate or paraphrase text..."
                        size="md"
                        class="w-full bg-transparent border-none outline-none focus:border-none focus:shadow-none focus:ring-0">
                        <div slot="left" class="z-10">
                            <AiIcon width="20px" height="20px" className="fill-border-toolbar" />
                        </div>
                        <Button
                            slot="right"
                            class={cn(
                                "p-1 text-sm rounded-sm border border-solid border-transparent",
                                searchQuery ? "bg-background-toolbar-focused hover:bg-background-hovered text-text-toolbar-focused" : "bg-transparent text-text-toolbar",
                            )}
                            on:click={handleGenerateFromInput}>
                            Enter
                        </Button>
                    </Input>
                {:else}
                    <div class="w-full px-3 py-2.5 bg-transparent flex justify-start items-center gap-3">
                        <Spinner size="4" bg="bg-border-main" class="fill-primary" />
                        STEAMid AI is loading...
                    </div>
                {/if}

                {#if data}
                    <div class="p-2.5">
                        {data.content}
                    </div>
                {/if}
            </div>

            <div
                bind:this={selectMenu}
                class={cn(
                    "w-[250px] px-1 py-2 flex flex-col justify-center items-start bg-white text-black border border-solid border-border rounded-md drop-shadow-md",
                    loading && "hidden",
                    !data && !filteredTemplates?.length && "hidden",
                    !!data && !filteredCommands?.length && "hidden",
                )}>
                {#if !data}
                    {#if filteredTemplates.includes("autocomplete")}
                        <SharedDropdownButton command="autocomplete" onClick={handleGenerateFromButton}>
                            <ImproveIcon width="16px" height="16px" className="fill-primary" />
                            Autocomplete
                        </SharedDropdownButton>
                    {/if}
                    {#if filteredTemplates.includes("paraphrase")}
                        <SharedDropdownButton command="paraphrase" onClick={handleGenerateFromButton}>
                            <ImproveIcon className="fill-primary" />
                            Paraphrase
                        </SharedDropdownButton>
                    {/if}
                    {#if filteredTemplates.includes("rewrite")}
                        <SharedDropdownButton command="rewrite" onClick={handleGenerateFromButton}>
                            <ImproveIcon className="fill-primary" />
                            Re-write
                        </SharedDropdownButton>
                    {/if}
                    {#if filteredTemplates.includes("shorten text")}
                        <SharedDropdownButton command="shorten text" onClick={handleGenerateFromButton}>
                            <ImproveIcon className="fill-primary" />
                            Shorten text
                        </SharedDropdownButton>
                    {/if}
                    {#if filteredTemplates.includes("lengthen text")}
                        <SharedDropdownButton command="lengthen text" onClick={handleGenerateFromButton}>
                            <LongIcon className="fill-primary" />
                            Lengthen text
                        </SharedDropdownButton>
                    {/if}
                    {#if filteredTemplates.includes("humanize")}
                        <SharedDropdownButton command="humanize" onClick={handleGenerateFromButton}>
                            <ImproveIcon className="fill-primary" />
                            Humanize
                        </SharedDropdownButton>
                    {/if}
                    {#if filteredTemplates.includes("improve grammar")}
                        <SharedDropdownButton command="improve grammar" onClick={handleGenerateFromButton}>
                            <ImproveIcon className="fill-primary" />
                            Improve grammar
                        </SharedDropdownButton>
                    {/if}
                    {#if filteredTemplates.includes("simplify")}
                        <SharedDropdownButton command="simplify" onClick={handleGenerateFromButton}>
                            <SimplifyIcon className="fill-primary" />
                            Simplify
                        </SharedDropdownButton>
                    {/if}
                    {#if filteredTemplates.includes("summarize")}
                        <SharedDropdownButton command="summarize" onClick={handleGenerateFromButton}>
                            <SummarizeIcon className="fill-primary" />
                            Summarize
                        </SharedDropdownButton>
                    {/if}

                    {#if filteredTemplates.includes("tone of voice")}
                        <SharedDropdownButton>
                            <ReplaceIcon className="fill-primary" />
                            <span class="flex-1">Tone of voice</span>
                            <ChevronRightIcon />
                        </SharedDropdownButton>
                        <Dropdown placement="right-start" offset={-8} class="w-[180px] p-1 border border-solid border-border rounded-md drop-shadow-md">
                            <DropdownItem class="px-2 py-1" on:click={handleChangeTone} data-value="Formal">Formal</DropdownItem>
                            <DropdownItem class="px-2 py-1" on:click={handleChangeTone} data-value="Friendly">Friendly</DropdownItem>
                            <DropdownItem class="px-2 py-1" on:click={handleChangeTone} data-value="Professional">Professional</DropdownItem>
                            <DropdownItem class="px-2 py-1" on:click={handleChangeTone} data-value="Causal">Causal</DropdownItem>
                        </Dropdown>
                    {/if}
                    {#if filteredTemplates.includes("translate")}
                        <SharedDropdownButton>
                            <TranslateIcon className="fill-primary" />
                            <span class="flex-1">Translate</span>
                            <ChevronRightIcon />
                        </SharedDropdownButton>
                        <Dropdown placement="right-start" offset={-8} class="w-[180px] p-1 border border-solid border-border rounded-md drop-shadow-md">
                            <DropdownItem class="px-2 py-1" on:click={handleTranslate} data-value="Chinese">Chinese</DropdownItem>
                            <DropdownItem class="px-2 py-1" on:click={handleTranslate} data-value="English">English</DropdownItem>
                            <DropdownItem class="px-2 py-1" on:click={handleTranslate} data-value="French">French</DropdownItem>
                            <DropdownItem class="px-2 py-1" on:click={handleTranslate} data-value="German">German</DropdownItem>
                            <DropdownItem class="px-2 py-1" on:click={handleTranslate} data-value="Italian">Italian</DropdownItem>
                            <DropdownItem class="px-2 py-1" on:click={handleTranslate} data-value="Japanese">Japanese</DropdownItem>
                            <DropdownItem class="px-2 py-1" on:click={handleTranslate} data-value="Korean">Korean</DropdownItem>
                            <DropdownItem class="px-2 py-1" on:click={handleTranslate} data-value="Portuguese">Portuguese</DropdownItem>
                            <DropdownItem class="px-2 py-1" on:click={handleTranslate} data-value="Russian">Russian</DropdownItem>
                            <DropdownItem class="px-2 py-1" on:click={handleTranslate} data-value="Spanish">Spanish</DropdownItem>
                        </Dropdown>
                    {/if}
                {:else}
                    {#if filteredCommands.includes("replace selection")}
                        <SharedDropdownButton onClick={handleReplaceContent}>
                            <CheckIcon className="fill-primary" />
                            Replace Selection
                        </SharedDropdownButton>
                    {/if}
                    {#if filteredCommands.includes("insert above")}
                        <SharedDropdownButton onClick={handleInsertAboveContent}>
                            <PlusIcon className="fill-primary" />
                            Insert above
                        </SharedDropdownButton>
                    {/if}
                    {#if filteredCommands.includes("insert below")}
                        <SharedDropdownButton onClick={handleInsertBelowContent}>
                            <PlusIcon className="fill-primary" />
                            Insert below
                        </SharedDropdownButton>
                    {/if}
                    {#if filteredCommands.includes("try again")}
                        <SharedDropdownButton onClick={handleRetryContent}>
                            <ReplaceIcon className="fill-primary" />
                            Try again
                        </SharedDropdownButton>
                    {/if}
                    {#if filteredCommands.includes("discard")}
                        <SharedDropdownButton onClick={handleDiscardContent}>
                            <TrashIcon className="fill-primary" />
                            Discard
                        </SharedDropdownButton>
                    {/if}
                {/if}
            </div>
        </div>
    </div>
{/if}
