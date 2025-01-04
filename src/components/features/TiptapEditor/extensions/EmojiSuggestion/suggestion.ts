import tippy from "tippy.js";
import EmojiList from "./components/EmojiList.svelte";
import type { Editor } from "@tiptap/core";
import type { SuggestionProps } from "@tiptap/suggestion";

export const emojiSuggestion = {
    items: ({ editor, query }: { editor: Editor; query: string }) =>
        editor.storage.emoji.emojis
            .filter(
                ({ shortcodes, tags }: { shortcodes: string[]; tags: string[] }) =>
                    shortcodes.find((shortcode) => shortcode.startsWith(query.toLowerCase())) || tags.find((tag) => tag.startsWith(query.toLowerCase())),
            )
            .slice(0, 250),

    allowSpaces: false,

    render: () => {
        let component: EmojiList;
        let popup: ReturnType<typeof tippy>;
        let selected = false;

        return {
            onStart: (props: SuggestionProps) => {
                let element = document.createElement("div");
                component = new EmojiList({
                    target: element,
                    props: {
                        editor: props.editor,
                        range: props.range,
                        items: props.items,
                    },
                });

                popup = tippy("body", {
                    getReferenceClientRect: props.clientRect,
                    appendTo: () => document.body,
                    content: element,
                    showOnCreate: true,
                    interactive: true,
                    trigger: "manual",
                    placement: "bottom-start",
                });
            },

            onUpdate(props: SuggestionProps) {
                component.$set({
                    editor: props.editor,
                    range: props.range,
                    items: props.items,
                });
                if (!props.clientRect) {
                    return;
                }

                popup[0].setProps({
                    getReferenceClientRect: props.clientRect,
                });
            },

            onKeyDown(props: SuggestionProps) {
                if (props.event.key === "Escape") {
                    popup[0].hide();
                    return true;
                }
                if (props.event.key === "Enter") {
                    selected = true;
                    props.event.preventDefault();
                    return true;
                }
            },

            onExit() {
                popup[0].destroy();
                component.$destroy();
            },
        };
    },
};

export default emojiSuggestion;
