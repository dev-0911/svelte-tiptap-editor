import { Node } from "@tiptap/core";
import SvelteNodeViewRenderer from "../NodeViewRenderer/SvelteNodeViewRenderer";
import { ImageUploadView } from "./view";

declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        imageUpload: {
            setImageUpload: () => ReturnType;
        };
    }
}

export const ImageUpload = Node.create({
    name: "imageUpload",

    isolating: true,

    defining: true,

    group: "block",

    draggable: true,

    selectable: true,

    inline: false,

    parseHTML() {
        return [
            {
                tag: `div[data-type="${this.name}"]`,
            },
        ];
    },

    renderHTML() {
        return ["div", { "data-type": this.name }];
    },

    addCommands() {
        return {
            setImageUpload:
                () =>
                ({ commands }) =>
                    commands.insertContent(`<div data-type="${this.name}"></div>`),
        };
    },

    addNodeView() {
        return SvelteNodeViewRenderer(ImageUploadView);
    },
});

export default ImageUpload;
