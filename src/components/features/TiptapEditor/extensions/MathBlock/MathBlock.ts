import { mergeAttributes, Node, type Range } from "@tiptap/core";
import Mathematics from "@tiptap-pro/extension-mathematics";
import Image from "@tiptap/extension-image";
import { SvelteNodeViewRenderer } from "$lib/SvelteNodeViewRender";
import { MathBlockView } from "./components";

declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        mathBlock: {
            setMathBlock: () => ReturnType;
            setMathBlockAt: (attributes: { pos: number | Range }) => ReturnType;
            setMathContent: (attributes: { content: string; katex: string }) => ReturnType;
        };
    }
}

export const MathBlock = Node.create({
    name: "mathBlock",

    group: "block",

    draggable: true,

    addAttributes() {
        return {
            katex: {
                default: undefined,
                parseHTML: (element) => element.getAttribute("data-katex"),
                renderHTML: (attributes) => ({
                    "data-katex": attributes.katex,
                }),
            },
            content: {
                default: undefined,
            },
        };
    },

    parseHTML() {
        return [
            {
                tag: `div.node-${this.name}`,
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        return ["div", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)];
    },

    addCommands() {
        return {
            setMathBlock:
                () =>
                ({ commands }) => {
                    return commands.insertContent({ type: "mathBlock", attrs: {} });
                },

            setMathBlockAt:
                (attrs) =>
                ({ commands }) => {
                    return commands.insertContentAt(attrs.pos, { type: "mathBlock", attrs: {} });
                },

            setMathContent:
                (attrs) =>
                ({ commands }) => {
                    return commands.updateAttributes("mathBlock", { katex: attrs.katex, content: attrs.content });
                },
        };
    },

    addNodeView() {
        return SvelteNodeViewRenderer(MathBlockView);
    },
});
