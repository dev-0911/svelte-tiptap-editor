import { getHTMLContentBetween } from "@tiptap-pro/extension-ai";
import type { Editor } from "@tiptap/core";

export const useAiHooks = (editor: Editor) => {
    let tone = $state("Friendly");

    const onChangeTone = (ev: any) => {
        tone = ev.currentTarget.dataset.tone;
        ev.stopPropagation();
    };

    const onAutoComplete = (ev: any) => {
        editor.chain().focus().aiComplete({ stream: false, modelName: "gpt-4o", insert: false }).run();
        ev.stopPropagation();
    };

    const onParaphrase = (ev: any) => {
        ev.stopPropagation();
        const { from, to } = editor.state.selection;
        const selectedText = getHTMLContentBetween(editor, from, to);
        editor.commands.aiTextPrompt({
            text: `Paraphrase the following sentence: ${selectedText}`,
            stream: false,
            modelName: "gpt-4o",
            insert: false,
        });
    };

    const onRewrite = (ev: any) => {
        ev.stopPropagation();
    };

    const onShortenText = (ev: any) => {
        editor.chain().focus().aiShorten({ stream: false, modelName: "gpt-4o", insert: false }).run();
        ev.stopPropagation();
    };

    const onLengthenText = (ev: any) => {
        editor.chain().focus().aiExtend({ stream: false, modelName: "gpt-4o", insert: false }).run();
        ev.stopPropagation();
    };

    const onHumanize = (ev: any) => {
        ev.stopPropagation();
        const { from, to } = editor.state.selection;
        const selectedText = getHTMLContentBetween(editor, from, to);

        editor.commands.aiTextPrompt({
            text: `Try to humanize the following sentences: ${selectedText}`,
            stream: false,
            modelName: "gpt-4o",
            insert: false,
        });
    };

    const onImproveGrammar = (ev: any) => {
        editor.chain().focus().aiFixSpellingAndGrammar({ stream: false, modelName: "gpt-4o", insert: false }).run();
        ev.stopPropagation();
    };

    const onSimplify = (ev: any) => {
        editor.chain().focus().aiSimplify({ stream: false, modelName: "gpt-4o", insert: false }).run();
        ev.stopPropagation();
    };

    const onSummarize = (ev: any) => {
        editor.chain().focus().aiSummarize({ stream: false, modelName: "gpt-4o", insert: false }).run();
        ev.stopPropagation();
    };

    const onTranslate = (ev: any) => {
        const language = ev.currentTarget.dataset.language;
        editor.chain().focus().aiTranslate(language, { stream: false, modelName: "gpt-4o", insert: false }).run();
        ev.stopPropagation();
    };

    const onGenerateFromInput = (ev: any, searchQuery: string) => {
        ev.stopPropagation();
        editor
            .chain()
            .focus()
            .aiTextPrompt({ text: `${searchQuery}`, stream: false, modelName: "gpt-4o", insert: false })
            .run();
    };

    const onRegenerate = (ev: any) => {
        ev.stopPropagation();
        editor.chain().focus().aiRegenerate().run();
    };

    return {
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
    };
};
