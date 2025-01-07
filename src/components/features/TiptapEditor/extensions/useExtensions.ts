import { UniqueID } from "@tiptap-pro/extension-unique-id";
import { Details } from "@tiptap-pro/extension-details";
import { DetailsContent } from "@tiptap-pro/extension-details-content";
import { DetailsSummary } from "@tiptap-pro/extension-details-summary";
import Paragraph from "@tiptap/extension-paragraph";
import { FocusClasses as Focus } from "@tiptap/extension-focus";
import Text from "@tiptap/extension-text";
import Underline from "@tiptap/extension-underline";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import ListItem from "@tiptap/extension-list-item";
import TextAlign from "@tiptap/extension-text-align";
import CharacterCount from "@tiptap/extension-character-count";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import History from "@tiptap/extension-history";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import FontFamily from "@tiptap/extension-font-family";
import FontSize from "tiptap-extension-font-size";
import BubbleMenu from "@tiptap/extension-bubble-menu";

import OrderedList from "@tiptap/extension-ordered-list";
import BulletList from "@tiptap/extension-bullet-list";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Typography from "@tiptap/extension-typography";
import Dropcursor from "@tiptap/extension-dropcursor";
import { Export } from "@tiptap-pro/extension-export";
import { Import } from "@tiptap-pro/extension-import";
import FileHandler from "@tiptap-pro/extension-file-handler";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import { all, createLowlight } from "lowlight";
import HardBreak from "@tiptap/extension-hard-break";
import { Placeholder } from "@tiptap/extension-placeholder";

import { BlockquoteFigure } from "./BlockquoteFigure";
import { CodeBlock } from "./CodeBlock";
import { Document } from "./Document";
import { Figure } from "./Figure";
import { Figcaption } from "./Figcaption";
import { Heading } from "./Heading";
import { HorizontalRule } from "./HorizontalRule";
import { ImageBlock } from "./ImageBlock";
import { ImageUpload } from "./ImageUpload";
import { Link } from "./Link";
import { Quote } from "./BlockquoteFigure/Quote";
import { Selection } from "./Selection";
import { Table, TableCell, TableHeader, TableRow } from "./Table";

import Emoji from "@tiptap-pro/extension-emoji";
import Mathematics, { defaultShouldRender } from "@tiptap-pro/extension-mathematics";
import { uploadImage } from "$lib/api/upload";
import { isChangeOrigin } from "@tiptap/extension-collaboration";
// import EmojiSuggestion from "./EmojiSuggestion";
import { CommentsKit } from "@tiptap-pro/extension-comments";
import { HocuspocusProvider, TiptapCollabProvider } from "@hocuspocus/provider";
import { TrailingNode } from "./TrailingNode";
import { Column, Columns } from "./MultiColumn";

const useExtensions = (provider: TiptapCollabProvider) => {
    const lowlight = createLowlight(all);
    lowlight.register("html", html);
    lowlight.register("css", css);
    lowlight.register("js", js);
    lowlight.register("ts", ts);

    return [
        StarterKit.configure({
            document: false,
            dropcursor: false,
            heading: false,
            horizontalRule: false,
            blockquote: false,
            history: false,
            codeBlock: false,
        }),
        Document,
        Columns,
        Column,
        TaskList,
        TaskItem.configure({ nested: true }),
        Selection,
        Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
        HorizontalRule,
        UniqueID.configure({
            types: ["paragraph", "heading", "blockquote", "codeBlock", "table"],
            filterTransaction: (transaction) => !isChangeOrigin(transaction),
        }),
        Details.configure({
            persist: true,
            HTMLAttributes: {
                class: "details",
            },
        }),
        DetailsContent,
        DetailsSummary,
        CodeBlock,
        TextStyle,
        FontSize,

        FontFamily,
        Color,
        TrailingNode,
        Link.configure({
            openOnClick: false,
        }),
        Highlight.configure({ multicolor: true }),
        Underline,
        CharacterCount.configure({ limit: 50000 }),
        ImageUpload.configure({
            clientId: provider?.document?.clientID,
        }),
        ImageBlock,
        FileHandler.configure({
            allowedMimeTypes: ["image/png", "image/jpeg", "image/gif", "image/webp"],
            onDrop: (currentEditor, files, pos) => {
                files.forEach(async (file) => {
                    const url = await uploadImage(file);

                    currentEditor.chain().setImageBlockAt({ pos, src: url }).focus().run();
                });
            },
            onPaste: (currentEditor, files) => {
                files.forEach(async (file) => {
                    const url = await uploadImage(file);

                    return currentEditor.chain().setImageBlockAt({ pos: currentEditor.state.selection.anchor, src: url }).focus().run();
                });
            },
        }),
        Emoji.configure({
            enableEmoticons: true,
            // suggestion: emojiSuggestion,
        }),
        TextAlign.extend({
            addKeyboardShortcuts() {
                return {};
            },
        }).configure({
            types: ["heading", "paragraph"],
        }),
        Subscript,
        Superscript,
        Table,
        TableCell,
        TableHeader,
        TableRow,
        Typography,
        Placeholder.configure({
            includeChildren: true,
            showOnlyCurrent: false,
            placeholder: () => "",
        }),
        Focus,
        Figcaption,
        BlockquoteFigure,
        Dropcursor.configure({
            width: 2,
            class: "ProseMirror-dropcursor border-black",
        }),

        Mathematics.configure({
            shouldRender: (state, pos, node) => {
                // this will disable rendering for headings & code blocks
                return defaultShouldRender(state, pos) && node.type.name !== "heading";
            },
        }),
    ];
};

export default useExtensions;
