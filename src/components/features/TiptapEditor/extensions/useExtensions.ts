import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
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
import Heading from "@tiptap/extension-heading";
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
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import { Table, TableCell, TableHeader, TableRow } from "./Table";
import { ImageBlock } from "./ImageBlock";
import { ImageUpload } from "./ImageUpload";
import Emoji from "@tiptap-pro/extension-emoji";
import Mathematics, { defaultShouldRender } from "@tiptap-pro/extension-mathematics";
import { uploadImage } from "$lib/api/upload";
import { Link } from "./Link";
// import EmojiSuggestion from "./EmojiSuggestion";

const useExtensions = (appId: string, token: string) => {
    const lowlight = createLowlight(all);
    lowlight.register("html", html);
    lowlight.register("css", css);
    lowlight.register("js", js);
    lowlight.register("ts", ts);

    return [
        History,
        Document,
        Paragraph,
        Heading,
        HardBreak,
        HorizontalRule,
        Text,
        TextStyle,
        Bold,
        Italic,
        Underline,
        Strike,
        FontSize,
        FontFamily.configure({
            types: ["textStyle"],
        }),
        Color,
        Highlight.configure({ multicolor: true }),
        CodeBlockLowlight.configure({
            lowlight,
            defaultLanguage: "plaintext",
        }),
        TextAlign.configure({
            types: ["heading", "paragraph"],
        }),
        Subscript,
        Superscript,
        OrderedList,
        BulletList,
        ListItem,
        TaskList,
        TaskItem,
        BubbleMenu.configure({
            shouldShow: ({ editor, view, state, oldState, from, to }) => {
                return editor.isActive("image") || editor.isActive("link");
            },
        }),
        Link.configure({
            openOnClick: false,
        }),

        // CustomImage,
        Typography,
        Dropcursor,
        CharacterCount.configure(),
        Import.configure({
            appId,
            token,
        }),
        Export.configure({
            appId,
            token,
        }),

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
        // FileHandler.configure({
        //     allowedMimeTypes: ["image/png", "image/jpeg", "image/gif", "image/webp"],
        //     onDrop: (currentEditor, files, pos) => {
        //         files.forEach((file) => {
        //             const fileReader = new FileReader();

        //             fileReader.readAsDataURL(file);
        //             fileReader.onload = () => {
        //                 currentEditor
        //                     .chain()
        //                     .insertContentAt(pos, {
        //                         type: "image",
        //                         attrs: {
        //                             src: fileReader.result,
        //                         },
        //                     })
        //                     .focus()
        //                     .run();
        //             };
        //         });
        //     },
        //     onPaste: (currentEditor, files, htmlContent) => {
        //         files.forEach((file) => {
        //             if (htmlContent) {
        //                 // if there is htmlContent, stop manual insertion & let other extensions handle insertion via inputRule
        //                 // you could extract the pasted file from this url string and upload it to a server for example
        //                 console.log(htmlContent); // eslint-disable-line no-console
        //                 return false;
        //             }

        //             const fileReader = new FileReader();

        //             fileReader.readAsDataURL(file);
        //             fileReader.onload = () => {
        //                 currentEditor
        //                     .chain()
        //                     .insertContentAt(currentEditor.state.selection.anchor, {
        //                         type: "image",
        //                         attrs: {
        //                             src: fileReader.result,
        //                         },
        //                     })
        //                     .focus()
        //                     .run();
        //             };
        //         });
        //     },
        // }),
        // Collaboration.configure({
        //     document: doc, // Configure Y.Doc for collaboration
        // }),
        //AdvancedT extensions
        Table,
        TableCell,
        TableHeader,
        TableRow,
        ImageBlock,
        ImageUpload,
        Emoji.configure({
            enableEmoticons: true,
            // suggestion: emojiSuggestion,
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
