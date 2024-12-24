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
import FontFamily from "@tiptap/extension-font-family";
import FontSize from "tiptap-extension-font-size";
import BubbleMenu from "@tiptap/extension-bubble-menu";
import Link from "@tiptap/extension-link";
import OrderedList from "@tiptap/extension-ordered-list";
import BulletList from "@tiptap/extension-bullet-list";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import CustomOrderedList from "./CustomOrderList";
import CustomBulletList from "./CustomBulletList";

const useExtensions = () => {
    return [
        History,
        Document,
        Paragraph,
        // CustomParagraph,
        Heading,
        // CustomHeading,
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
        CodeBlock,
        TextAlign.configure({
            types: ["heading", "paragraph"],
        }),
        Subscript,
        Superscript,
        // OrderedList,
        CustomOrderedList,
        // BulletList,
        CustomBulletList,
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
        CharacterCount.configure(),
    ];
};

export default useExtensions;
