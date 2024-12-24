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

    export let editor;
    export let onReplace;
    export let onAdd;

    const API_URL = "https://steam.buntod.com/api/ai/prompt";
    const TOKEN = import.meta.env.VITE_AWS_TOKEN;

    let button;
    let inputMenu;
    let selectMenu;

    let command = null;
    let tone = null;
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
    let contents = [];

    const initDropdown = () => {
        command = null;
        tone = null;
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

    async function handleGenerateAiText(command, content, tone) {
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
        // command = ev.currentTarget.dataset.command;
        command = "assistant";
        tone = ev.currentTarget.dataset.tone;
        ev.stopPropagation();
        searchQuery = "";
        await handleGenerateAiText(command, content, tone);
    }

    async function handleGenerateFromInput(ev) {
        if (!searchQuery.length) return;
        from = editor.state.selection.from;
        to = editor.state.selection.to;
        content = editor.state.doc.textBetween(from, to, " ");
        // command = ev.currentTarget.dataset.command;
        // command = searchQuery;
        command = "assistant";
        console.log(searchQuery);
        // tone = ev.currentTarget.dataset.tone;
        tone = "default";
        ev.stopPropagation();
        searchQuery = "";
        await handleGenerateAiText(command, content, tone);
    }

    function handleReplaceContent() {
        if (!data?.content) return;
        onReplace(data.content);
        showTooltip = false;
        initDropdown();
    }

    function handleInsertContent() {
        if (!data?.content) return;
        onAdd(data.content);
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
                    <!-- <span class="px-2 py-1 text-xs text-border-toolbar">Edit or Review</span> -->

                    {#if filteredTemplates.includes("improve fluency")}
                        <button
                            class="w-full px-2 py-1 flex justify-start items-center gap-2 bg-background hover:bg-background-hovered text-sm text-left text-black hover:drop-shadow-md"
                            data-command="Improve fluency"
                            on:click={handleGenerateFromButton}>
                            <ImproveIcon width="16px" height="16px" className="fill-primary" />
                            Improve fluency
                        </button>
                    {/if}
                    {#if filteredTemplates.includes("paraphrase")}
                        <button
                            class="w-full px-2 py-1 flex justify-start items-center gap-2 bg-background hover:bg-background-hovered text-sm text-left text-black hover:drop-shadow-md">
                            <ReplaceIcon width="16px" height="16px" className="fill-primary" />
                            <span class="flex-1">Paraphrase</span>
                            <ChevronRightIcon width="16px" height="16px" />
                        </button>
                        <Dropdown placement="right-start" offset={-8} class="w-[180px] p-1 border border-solid border-border rounded-md drop-shadow-md">
                            <DropdownItem class="px-2 py-1" on:click={handleGenerateFromButton} data-command="paraphrase" data-tone="Academically">Academically</DropdownItem>
                            <DropdownItem class="px-2 py-1" on:click={handleGenerateFromButton} data-command="paraphrase" data-tone="Casually">Casually</DropdownItem>
                            <DropdownItem class="px-2 py-1" on:click={handleGenerateFromButton} data-command="paraphrase" data-tone="Persuasively">Persuasively</DropdownItem>
                            <DropdownItem class="px-2 py-1" on:click={handleGenerateFromButton} data-command="paraphrase" data-tone="Boldly">Boldly</DropdownItem>
                            <DropdownItem class="px-2 py-1" on:click={handleGenerateFromButton} data-command="paraphrase" data-tone="Frendly">Frendly</DropdownItem>
                        </Dropdown>
                    {/if}
                    {#if filteredTemplates.includes("simplyify")}
                        <button
                            class="w-full px-2 py-1 flex justify-start items-center gap-2 bg-background hover:bg-background-hovered text-sm text-left text-black hover:drop-shadow-md">
                            <SimplifyIcon width="16px" height="16px" className="fill-primary" />
                            <span class="flex-1">Simplify</span>
                            <ChevronRightIcon width="16px" height="16px" />
                        </button>
                        <Dropdown placement="right-start" offset={-8} class="w-[180px] p-1 border border-solid border-border rounded-md drop-shadow-md">
                            <DropdownItem class="px-2 py-1" on:click={handleGenerateFromButton} data-command="simplyify" data-tone="Academically">Academically</DropdownItem>
                            <DropdownItem class="px-2 py-1" on:click={handleGenerateFromButton} data-command="simplyify" data-tone="Casually">Casually</DropdownItem>
                            <DropdownItem class="px-2 py-1" on:click={handleGenerateFromButton} data-command="simplyify" data-tone="Persuasively">Persuasively</DropdownItem>
                            <DropdownItem class="px-2 py-1" on:click={handleGenerateFromButton} data-command="simplyify" data-tone="Boldly">Boldly</DropdownItem>
                            <DropdownItem class="px-2 py-1" on:click={handleGenerateFromButton} data-command="simplyify" data-tone="Frendly">Frendly</DropdownItem>
                        </Dropdown>
                    {/if}
                    {#if filteredTemplates.includes("longer")}
                        <button
                            class="w-full px-2 py-1 flex justify-start items-center gap-2 bg-background hover:bg-background-hovered text-sm text-left text-black hover:drop-shadow-md"
                            on:click={handleGenerateFromButton}
                            data-command="longer">
                            <LongIcon width="16px" height="16px" className="fill-primary" />
                            <span class="flex-1">Make longer</span>
                        </button>
                    {/if}
                    {#if filteredTemplates.includes("translate")}
                        <button
                            class="w-full px-2 py-1 flex justify-start items-center gap-2 bg-background hover:bg-background-hovered text-sm text-left text-black hover:drop-shadow-md">
                            <TranslateIcon width="16px" height="16px" className="fill-primary" />
                            <span class="flex-1">Translate</span>
                            <ChevronRightIcon width="16px" height="16px" />
                        </button>
                        <Dropdown placement="right-start" offset={-8} class="w-[180px] p-1 border border-solid border-border rounded-md drop-shadow-md">
                            <DropdownItem class="px-2 py-1" on:click={handleGenerateFromButton} data-command="translate" data-tone="Academically">Academically</DropdownItem>
                            <DropdownItem class="px-2 py-1" on:click={handleGenerateFromButton} data-command="translate" data-tone="Casually">Casually</DropdownItem>
                            <DropdownItem class="px-2 py-1" on:click={handleGenerateFromButton} data-command="translate" data-tone="Persuasively">Persuasively</DropdownItem>
                            <DropdownItem class="px-2 py-1" on:click={handleGenerateFromButton} data-command="translate" data-tone="Boldly">Boldly</DropdownItem>
                            <DropdownItem class="px-2 py-1" on:click={handleGenerateFromButton} data-command="translate" data-tone="Frendly">Frendly</DropdownItem>
                        </Dropdown>
                    {/if}
                    <!-- <span class="px-2 py-1 text-xs text-border-toolbar">Generate from selection</span> -->
                    {#if filteredTemplates.includes("summarize")}
                        <button
                            class="w-full px-2 py-1 flex justify-start items-center gap-2 bg-background hover:bg-background-hovered text-sm text-left text-black hover:drop-shadow-md"
                            on:click={handleGenerateFromButton}
                            data-command="summarize">
                            <SummarizeIcon width="16px" height="16px" className="fill-primary" />Summarize
                        </button>
                    {/if}
                    {#if filteredTemplates.includes("write opposing argument")}
                        <button
                            class="w-full px-2 py-1 flex justify-start items-center gap-2 bg-background hover:bg-background-hovered text-sm text-left text-black hover:drop-shadow-md"
                            on:click={handleGenerateFromButton}
                            data-command="write opposing argument">
                            <PencilIcon width="16px" height="16px" className="fill-primary" />Write opposing argument
                        </button>
                    {/if}
                    {#if filteredTemplates.includes("write with more depth")}
                        <button
                            class="w-full px-2 py-1 flex justify-start items-center gap-2 bg-background hover:bg-background-hovered text-sm text-left text-black hover:drop-shadow-md"
                            on:click={handleGenerateFromButton}
                            data-command="write with more depth">
                            <PencilIcon width="16px" height="16px" className="fill-primary" />Write with more depth
                        </button>
                    {/if}
                    {#if filteredTemplates.includes("continue writing")}
                        <!-- <span class="px-2 py-1 text-xs text-border-toolbar">Write</span> -->
                        <button
                            class="w-full px-2 py-1 flex justify-start items-center gap-2 bg-background hover:bg-background-hovered text-sm text-left text-black hover:drop-shadow-md"
                            on:click={handleGenerateFromButton}
                            data-command="continue writing">
                            <PencilIcon width="16px" height="16px" className="fill-primary" />
                            Continue Writing
                        </button>
                    {/if}
                {:else}
                    {#if filteredCommands.includes("replace selection")}
                        <button
                            class="w-full px-2 py-1 flex justify-start items-center gap-2 bg-background hover:bg-background-hovered text-sm text-left text-black hover:drop-shadow-md"
                            on:click={handleReplaceContent}>
                            <CheckIcon width="16px" height="16px" className="fill-primary" />
                            Replace Selection
                        </button>
                    {/if}
                    {#if filteredCommands.includes("insert below")}
                        <button
                            class="w-full px-2 py-1 flex justify-start items-center gap-2 bg-background hover:bg-background-hovered text-sm text-left text-black hover:drop-shadow-md"
                            on:click={handleInsertContent}>
                            <PlusIcon width="16px" height="16px" className="fill-primary" />
                            Insert below
                        </button>
                    {/if}
                    {#if filteredCommands.includes("try again")}
                        <button
                            class="w-full px-2 py-1 flex justify-start items-center gap-2 bg-background hover:bg-background-hovered text-sm text-left text-black hover:drop-shadow-md"
                            on:click={handleRetryContent}>
                            <ReplaceIcon width="16px" height="16px" className="fill-primary" />
                            Try again
                        </button>
                    {/if}
                    {#if filteredCommands.includes("discard")}
                        <button
                            class="w-full px-2 py-1 flex justify-start items-center gap-2 bg-background hover:bg-background-hovered text-sm text-left text-black hover:drop-shadow-md"
                            on:click={handleDiscardContent}>
                            <TrashIcon width="16px" height="16px" className="fill-primary" />
                            Discard
                        </button>
                    {/if}
                {/if}
            </div>
        </div>
    </div>
{/if}
