declare global {
    interface EditorLink {
        type: "link";
        attrs: {
            href: string;
            target: "_blank";
        };
    }

    interface EditorTextStyle {
        type: "customTextStyle";
        attrs: Record<"fontFamily" | "color" | "backgroundColor", string>;
    }

    type EditorMark = { type: "bold" | "italic" | "strike" | "underline"; attrs: never } | EditorLink | EditorTextStyle;

    type HeadingLevel = 1 | 2 | 3 | 4;

    interface EditorHeading {
        type: "heading";
        attrs?: { level: HeadingLevel };
        content?: EditorText[];
    }

    interface EditorParagraph {
        type: "paragraph";
        content?: EditorText[];
    }

    interface EditorBlockquote {
        type: "blockquote";
        content: EditorParagraph[];
    }

    interface EditorListItem {
        type: "listItem";
        content: EditorParagraph[];
    }

    interface EditorOrderList {
        type: "orderedList";
        attrs: { start: number };
        content: EditorListItem[];
    }

    interface EditorBulletList {
        type: "bulletList";
        content: EditorListItem[];
    }

    interface EditorTableCell {
        type: "tableCell";
        content: EditorParagraph[];
        attrs: { colspan: number; rowspan: number; colwidth?: number[] | null };
    }

    interface EditorTableRow {
        type: "tableRow";
        content: EditorTableCell[];
    }

    interface EditorTable {
        type: "table";
        content: EditorTableRow[];
    }

    interface EditorImage {
        type: "image";
        attrs: Record<"src" | "alt" | "title" | "filename", string>;
    }

    interface EditorBreak {
        type: "hardBreak";
    }

    interface EditorText {
        type: "text";
        text: string;
        marks?: EditorMark[];
    }

    type IEditorNode =
        | EditorHeading
        | EditorImage
        | EditorOrderList
        | EditorBulletList
        | EditorTable
        | EditorBlockquote
        | EditorBreak
        | EditorTableRow
        | EditorTableCell
        | EditorParagraph
        | EditorText
        | EditorListItem;

    interface IEditorContent {
        type: "doc";
        content: IEditorNode[];
    }
}

export {}