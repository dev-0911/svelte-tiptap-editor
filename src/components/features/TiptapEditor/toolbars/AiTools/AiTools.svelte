<script>
    import { onMount, onDestroy } from "svelte";
    import cn from "classnames";
    import LogoIcon from "$components/assets/svg/LogoIcon.svelte";
    import { Button, Dropdown, DropdownItem, Input, Spinner } from "flowbite-svelte";
    import { fade } from "svelte/transition";

    import { offset, flip, shift } from "svelte-floating-ui/dom";
    import { createFloatingActions } from "svelte-floating-ui";

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
    import { suggestionTemplates, suggestionCommands, languages, tones, terms } from "./constant";
    import SharedDropdownButton from "$components/shared/SharedDropdownButton/SharedDropdownButton.svelte";
    import { tryParseToTiptapHTML } from "@tiptap-pro/extension-ai";
    import SharedDropdown from "$components/shared/SharedDropdown/SharedDropdown.svelte";
    import { useAiHooks } from "./useAiHooks.svelte";

    const { editor, onReplace, onInsertAbove, onInsertBelow } = $props();

    const handleClickOutside = (event) => {
        if (!menuButton || !inputMenu || !selectMenu) return;
        if (menuButton.contains(event.target)) return;
        if (inputMenu.contains(event.target)) return;
        if (selectMenu.contains(event.target)) return;

        event.stopPropagation();

        showMenuButton = false;
        initDropdown();
    };

    onMount(() => {
        document.addEventListener("click", handleClickOutside);
    });

    onDestroy(() => {
        document.removeEventListener("click", handleClickOutside);
    });

    const [floatingRef, floatingContent] = createFloatingActions({
        strategy: "absolute",
        placement: "bottom",
        middleware: [offset(8), flip(), shift()],
    });

    let aiStorage = $state(null);

    $effect(() => {
        aiStorage = editor.storage.ai || editor.storage.aiAdvanced;
    });

    const loading = $derived(aiStorage?.state === "loading");
    const data = $derived(aiStorage?.response);
    const error = $derived(aiStorage?.error);

    const {
        onChangeTone,
        onAutoComplete,
        onParaphrase,
        onRewrite,
        onShortenText,
        onLengthenText,
        onHumanize,
        onImproveGrammar,
        onSimplify,
        onSummarize,
        onTranslate,
        onGenerateFromInput,
        onRegenerate,
    } = useAiHooks(editor);

    let menuButton;
    let showMenuButton = $state(false);
    let searchQuery = $state("");
    let inputMenu = $state(null);
    let selectMenu = $state(null);

    let contents = [];
    const initDropdown = () => {
        contents = [];
        searchQuery = "";
        aiStorage = null;
    };

    const toggleMenuButton = () => {
        showMenuButton = !showMenuButton;
        initDropdown();
    };

    let filteredTemplates = $derived(
        !searchQuery.length ? suggestionTemplates : suggestionTemplates.filter((template) => template.toLowerCase().includes(searchQuery.toLowerCase())),
    );

    function handleReplaceContent() {
        if (!data) return;
        onReplace(data);
        showMenuButton = false;
        initDropdown();
    }

    function handleInsertAboveContent() {
        if (!data) return;
        onInsertAbove(data);
        showMenuButton = false;
        initDropdown();
    }

    function handleInsertBelowContent() {
        if (!data) return;
        onInsertBelow(data);
        showMenuButton = false;
        initDropdown();
    }

    function handleDiscardContent() {
        showMenuButton = false;
        initDropdown();
    }

    const handleGenerateFromInput = (ev) => {
        onGenerateFromInput(ev, searchQuery);
    };
</script>

<button
    use:floatingRef
    bind:this={menuButton}
    onclick={toggleMenuButton}
    disabled={editor.state.selection.empty}
    class={cn(
        "min-w-32 p-1 flex justify-center items-center gap-2 bg-background-toolbar hover:bg-background-toolbar-hovered text-text-toolbar text-sm rounded-sm",
        !editor.state.selection.empty ? "bg-background-toolbar-focused hover:bg-background-hovered text-text-toolbar-focused" : "bg-background-toolbar text-text-toolbar",
        showMenuButton ? "border border-solid border-primary" : "border border-solid border-transparent",
    )}>
    <LogoIcon width="20px" height="20px" />STEAMid AI
</button>

{#if showMenuButton}
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

                {#if error}
                    <div class="hint error">{error?.message}</div>
                {/if}

                {#if data}
                    <div class="p-2.5">
                        {@html tryParseToTiptapHTML(data, editor)}
                    </div>
                {/if}
            </div>

            <div
                bind:this={selectMenu}
                class={cn(
                    "w-[250px] px-1 py-2 flex flex-col justify-center items-start bg-white text-black border border-solid border-border rounded-md drop-shadow-md",
                    loading && "hidden",
                    !data && !filteredTemplates?.length && "hidden",
                )}>
                {#if !data}
                    {#if filteredTemplates.includes("autocomplete")}
                        <SharedDropdownButton command="autocomplete" onClick={onAutoComplete}>
                            <ImproveIcon width="16px" height="16px" className="fill-primary" />
                            Autocomplete
                        </SharedDropdownButton>
                    {/if}
                    {#if filteredTemplates.includes("paraphrase")}
                        <SharedDropdownButton command="paraphrase" onClick={onParaphrase}>
                            <ImproveIcon className="fill-primary" />
                            Paraphrase
                        </SharedDropdownButton>
                    {/if}
                    {#if filteredTemplates.includes("rewrite")}
                        <SharedDropdownButton command="rewrite" onClick={onRewrite}>
                            <ImproveIcon className="fill-primary" />
                            Re-write
                        </SharedDropdownButton>
                    {/if}
                    {#if filteredTemplates.includes("shorten text")}
                        <SharedDropdownButton command="shorten text" onClick={onShortenText}>
                            <ImproveIcon className="fill-primary" />
                            Shorten text
                        </SharedDropdownButton>
                    {/if}
                    {#if filteredTemplates.includes("lengthen text")}
                        <SharedDropdownButton command="lengthen text" onClick={onLengthenText}>
                            <LongIcon className="fill-primary" />
                            Lengthen text
                        </SharedDropdownButton>
                    {/if}
                    {#if filteredTemplates.includes("humanize")}
                        <SharedDropdownButton command="humanize" onClick={onHumanize}>
                            <ImproveIcon className="fill-primary" />
                            Humanize
                        </SharedDropdownButton>
                    {/if}
                    {#if filteredTemplates.includes("improve grammar")}
                        <SharedDropdownButton command="improve grammar" onClick={onImproveGrammar}>
                            <ImproveIcon className="fill-primary" />
                            Improve grammar
                        </SharedDropdownButton>
                    {/if}
                    {#if filteredTemplates.includes("simplify")}
                        <SharedDropdownButton command="simplify" onClick={onSimplify}>
                            <SimplifyIcon className="fill-primary" />
                            Simplify
                        </SharedDropdownButton>
                    {/if}
                    {#if filteredTemplates.includes("summarize")}
                        <SharedDropdownButton command="summarize" onClick={onSummarize}>
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
                            {#each tones as tone}
                                <DropdownItem class="px-2 py-1" onclick={onChangeTone} data-tone={tone.code}>{tone.name}</DropdownItem>
                            {/each}
                        </Dropdown>
                    {/if}

                    {#if filteredTemplates.includes("translate")}
                        <SharedDropdownButton>
                            <TranslateIcon className="fill-primary" />
                            <span class="flex-1">Translate</span>
                            <ChevronRightIcon />
                        </SharedDropdownButton>

                        <SharedDropdown placement="right-start" offset={-8}>
                            {#each languages as language}
                                <DropdownItem class="px-2 py-1" onclick={onTranslate} data-language={language.code}>{language.name}</DropdownItem>
                            {/each}
                        </SharedDropdown>
                    {/if}
                {:else}
                    <SharedDropdownButton onClick={handleReplaceContent}>
                        <CheckIcon className="fill-primary" />
                        Replace Selection
                    </SharedDropdownButton>

                    <SharedDropdownButton onClick={handleInsertAboveContent}>
                        <PlusIcon className="fill-primary" />
                        Insert above
                    </SharedDropdownButton>

                    <SharedDropdownButton onClick={handleInsertBelowContent}>
                        <PlusIcon className="fill-primary" />
                        Insert below
                    </SharedDropdownButton>

                    <SharedDropdownButton onClick={onRegenerate}>
                        <ReplaceIcon className="fill-primary" />
                        Try again
                    </SharedDropdownButton>

                    <SharedDropdownButton onClick={handleDiscardContent}>
                        <TrashIcon className="fill-primary" />
                        Discard
                    </SharedDropdownButton>
                {/if}
            </div>
        </div>
    </div>
{/if}
