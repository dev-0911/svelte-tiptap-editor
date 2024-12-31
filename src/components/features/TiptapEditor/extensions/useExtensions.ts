import StarterKit from "@tiptap/starter-kit";
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
import CodeBlock from "@tiptap/extension-code-block";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import FontFamily from "@tiptap/extension-font-family";
import FontSize from "tiptap-extension-font-size";
import BubbleMenu from "@tiptap/extension-bubble-menu";
import Link from "@tiptap/extension-link";
import OrderedList from "@tiptap/extension-ordered-list";
import BulletList from "@tiptap/extension-bullet-list";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Typography from "@tiptap/extension-typography";
import Dropcursor from "@tiptap/extension-dropcursor";
// import CustomOrderedList from "./CustomOrderList";
// import CustomBulletList from "./CustomBulletList";
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

const useExtensions = (appId: string, token: string) => {
    const lowlight = createLowlight(all);
    lowlight.register("html", html);
    lowlight.register("css", css);
    lowlight.register("js", js);
    lowlight.register("ts", ts);
    // const doc = new Y.Doc(); // Initialize Y.Doc for shared editing
    return [
        // StarterKit,
        History,
        Document,
        Paragraph,
        // CustomParagraph,
        Heading,
        // CustomHeading,
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
        // CustomOrderedList,
        BulletList,
        // CustomBulletList,
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
            autolink: true,
            defaultProtocol: "https",
            protocols: ["http", "https"],
            isAllowedUri: (url, ctx) => {
                try {
                    // construct URL
                    const parsedUrl = url.includes(":") ? new URL(url) : new URL(`${ctx.defaultProtocol}://${url}`);

                    // use default validation
                    if (!ctx.defaultValidate(parsedUrl.href)) {
                        return false;
                    }

                    // disallowed protocols
                    const disallowedProtocols = ["ftp", "file", "mailto"];
                    const protocol = parsedUrl.protocol.replace(":", "");

                    if (disallowedProtocols.includes(protocol)) {
                        return false;
                    }

                    // only allow protocols specified in ctx.protocols
                    const allowedProtocols = ctx.protocols.map((p) => (typeof p === "string" ? p : p.scheme));

                    if (!allowedProtocols.includes(protocol)) {
                        return false;
                    }

                    // disallowed domains
                    const disallowedDomains = ["example-phishing.com", "malicious-site.net"];
                    const domain = parsedUrl.hostname;

                    if (disallowedDomains.includes(domain)) {
                        return false;
                    }

                    // all checks have passed
                    return true;
                } catch (error) {
                    return false;
                }
            },
            shouldAutoLink: (url) => {
                try {
                    // construct URL
                    const parsedUrl = url.includes(":") ? new URL(url) : new URL(`https://${url}`);

                    // only auto-link if the domain is not in the disallowed list
                    const disallowedDomains = ["example-no-autolink.com", "another-no-autolink.com"];
                    const domain = parsedUrl.hostname;

                    return !disallowedDomains.includes(domain);
                } catch (error) {
                    return false;
                }
            },
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
                files.forEach((file) => {
                    const fileReader = new FileReader();

                    fileReader.readAsDataURL(file);
                    fileReader.onload = () => {
                        currentEditor
                            .chain()
                            .insertContentAt(pos, {
                                type: "image",
                                attrs: {
                                    src: fileReader.result,
                                },
                            })
                            .focus()
                            .run();
                    };
                });
            },
            onPaste: (currentEditor, files, htmlContent) => {
                files.forEach((file) => {
                    if (htmlContent) {
                        // if there is htmlContent, stop manual insertion & let other extensions handle insertion via inputRule
                        // you could extract the pasted file from this url string and upload it to a server for example
                        console.log(htmlContent); // eslint-disable-line no-console
                        return false;
                    }

                    const fileReader = new FileReader();

                    fileReader.readAsDataURL(file);
                    fileReader.onload = () => {
                        currentEditor
                            .chain()
                            .insertContentAt(currentEditor.state.selection.anchor, {
                                type: "image",
                                attrs: {
                                    src: fileReader.result,
                                },
                            })
                            .focus()
                            .run();
                    };
                });
            },
        }),
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
    ];
};

export default useExtensions;
