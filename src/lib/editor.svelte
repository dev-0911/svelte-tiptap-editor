<script>
    import { onMount, onDestroy } from "svelte";
    import { Editor } from "@tiptap/core";
    import { Node, Schema } from "prosemirror-model";
    import Document from "@tiptap/extension-document";
    import FontFamily from "@tiptap/extension-font-family";
    import Color from "@tiptap/extension-color";
    import Paragraph from "@tiptap/extension-paragraph";
    import Text from "@tiptap/extension-text";
    import Bold from "@tiptap/extension-bold";
    import Italic from "@tiptap/extension-italic";
    import Heading from "@tiptap/extension-heading";
    import Link from "@tiptap/extension-link";
    import Underline from "@tiptap/extension-underline";
    import Subscript from "@tiptap/extension-subscript";
    import Superscript from "@tiptap/extension-superscript";
    import TextStyle from "@tiptap/extension-text-style";
    import TextAlign from "@tiptap/extension-text-align";
    import ListItem from "@tiptap/extension-list-item";
    import BulletList from "@tiptap/extension-bullet-list";
    import OrderedList from "@tiptap/extension-ordered-list";
    import History from "@tiptap/extension-history";

    /** Bootstrap. */
    let element;
    let editor;

    /** Link. */
    let linkUrl = "";
    let showLinkModal = false;

    /** Font style and size. */
    let fontFamily = "Arial";
    let fontSize = "16px";

    /** Color. */
    let selectedColor = "#000000";

    /** Prompt.*/
    let userInput = "";
    let aiResponse = "";
    let typingTimeout;

    /** Define the AI API endpoint and your API key. */
    const AI_API_URL = "https://steam.buntod.com/api/ai/chat";
    const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJyZWlqbyIsImV4cCI6MTczMzc1NjEwNn0.iFdTWnyNVdJsXLM1YNc6mEvHiXfDGFZkG_onyGVfbwc";

    /** Function to fetch AI response. */
    const fetchResponse = async () => {
        try {
            const res = await fetch(AI_API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${ACCESS_TOKEN}`,
                },
                body: JSON.stringify({ prompt: userInput }),
            });

            const data = await res.json();
            if (data && data.detail) {
                aiResponse = data.detail;
                /** Insert AI generated content after the user content in the editor. */
                insertAiResponse(aiResponse);
            }
        } catch (error) {
            console.error("Error fetching AI response:", error);
        }
    };

    /** Insert the AI response content after the existing content in the editor. */
    const insertAiResponse = (responseText) => {
        editor.chain().focus().insertContent(`<p>${responseText}</p>`).run();
    };

    onMount(() => {
        editor = new Editor({
            element: element,
            extensions: [
                Document,
                Paragraph,
                Text,
                Bold,
                Italic,
                Underline,
                Subscript,
                Superscript,
                Heading.configure({
                    levels: [1, 2, 3],
                }),
                TextAlign.configure({
                    types: ["heading", "paragraph"],
                }),
                Link.configure({
                    openOnClick: false,
                    autolink: true,
                    defaultProtocol: "https",
                    protocols: ["http", "https"],
                    HTMLAttributes: {
                        class: "text-blue-500 cursor-pointer",
                    },
                    isAllowedUri: (url, ctx) => {
                        try {
                            const parsedUrl = url.includes(":") ? new URL(url) : new URL(`${ctx.defaultProtocol}://${url}`);
                            if (!ctx.defaultValidate(parsedUrl.href)) return false;

                            const disallowedProtocols = ["ftp", "file", "mailto"];
                            const protocol = parsedUrl.protocol.replace(":", "");
                            if (disallowedProtocols.includes(protocol)) return false;

                            const allowedProtocols = ctx.protocols.map((p) => (typeof p === "string" ? p : p.scheme));
                            if (!allowedProtocols.includes(protocol)) return false;

                            const disallowedDomains = ["example-phishing.com", "malicious-site.net"];
                            const domain = parsedUrl.hostname;
                            if (disallowedDomains.includes(domain)) return false;

                            return true;
                        } catch (error) {
                            return false;
                        }
                    },
                    shouldAutoLink: (url) => {
                        try {
                            const parsedUrl = url.includes(":") ? new URL(url) : new URL(`https://${url}`);
                            const disallowedDomains = ["example-no-autolink.com", "another-no-autolink.com"];
                            const domain = parsedUrl.hostname;
                            return !disallowedDomains.includes(domain);
                        } catch (error) {
                            return false;
                        }
                    },
                }),
                TextStyle,
                Color.configure({
                    types: ["textStyle"],
                }),
                FontFamily.configure({
                    types: ["textStyle"],
                }),
                BulletList.configure({
                    HTMLAttributes: {
                        class: "list-inside list-disc",
                    },
                }),
                OrderedList.configure({
                    HTMLAttributes: {
                        class: "list-inside list-decimal",
                    },
                }),
                ListItem.configure({
                    HTMLAttributes: {
                        class: "mb-2",
                    },
                }),
                History,
            ],
            content: `
                <p>This is not italic.</p>
                <p><em>This is italic.</em></p>
                <p><strong>This is bold.</strong></p>
                <h1>This is a 1st level heading</h1>
                <h2>This is a 2nd level heading</h2>
                <h3>This is a 3rd level heading</h3>
                <h4>This 4th level heading will be converted to a paragraph, because levels are configured to be only 1, 2 or 3.</h4>
                <p>Start typing to generate text...</p>
            `,
        });
    });

    // Cleanup on destroy
    onDestroy(() => {
        if (editor) {
            editor.destroy();
        }
    });

    /** Toggle the link UI either add or edit. */
    const toggleLink = () => {
        if (editor.isActive("link")) {
            linkUrl = editor.getAttributes("link").href;
            showLinkModal = true;
        } else {
            linkUrl = prompt("Enter the URL:");
            if (linkUrl) {
                editor.chain().focus().toggleLink({ href: linkUrl }).run();
            }
        }
    };

    /** Update the link. */
    const updateLink = () => {
        if (linkUrl) {
            editor.chain().focus().extendMarkRange("link").setLink({ href: linkUrl }).run();
            showLinkModal = false;
        }
    };

    /** Function to set font size. */
    const setFontSize = (size) => {
        fontSize = size;
        editor.chain().focus().setMark("textStyle", { fontSize: size }).run();
    };

    /** Function to set font family. */
    const setFontFamily = (family) => {
        fontFamily = family;
        editor.chain().focus().setMark("textStyle", { fontFamily }).run();
    };

    /** Array of color options */
    const colorOptions = [
        { color: "#FF0000", label: "Red" },
        { color: "#00FF00", label: "Green" },
        { color: "#0000FF", label: "Blue" },
        { color: "#000000", label: "Black" },
        { color: "#FFFF00", label: "Yellow" },
    ];

    /** Change the text color when a user selects a color */
    const changeColor = (color) => {
        editor.chain().focus().setColor(color).run();
        selectedColor = color;
    };
</script>

{#if showLinkModal}
    <div class="modal">
        <input type="text" bind:value={linkUrl} placeholder="Enter link URL" on:input={() => editor.chain().focus().extendMarkRange("link").setLink({ href: linkUrl }).run()} />
        <button on:click={updateLink}>Update Link</button>
    </div>
{/if}

{#if editor}
    <div class="container mx-auto p-2">
        <select bind:value={fontFamily} on:change={() => setFontFamily(fontFamily)} class="border px-2 py-1 ml-2">
            <option value="Arial">Arial</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Courier New">Courier New</option>
            <option value="Georgia">Georgia</option>
        </select>

        <select bind:value={fontSize} on:change={() => setFontSize(fontSize)} class="border px-2 py-1 ml-2">
            <option value="12px">12px</option>
            <option value="14px">14px</option>
            <option value="16px">16px</option>
            <option value="18px">18px</option>
            <option value="20px">20px</option>
            <option value="24px">24px</option>
        </select>

        <select id="colorPicker" class="p-2 border border-gray-300 rounded bg-white" bind:value={selectedColor} on:change={(e) => changeColor(e.target.value)}>
            {#each colorOptions as { color, label }}
                <option value={color} style="background-color: {color}; color: {color === '#FFFF00' ? 'black' : 'white'};">
                    {label}
                </option>
            {/each}
        </select>

        <button on:click={() => editor.chain().focus().toggleBold().run()} class={editor.isActive("bold")}>B</button>

        <button on:click={() => editor.chain().focus().toggleItalic().run()} class={editor.isActive("italic")}>I</button>

        <button on:click={() => editor.chain().focus().toggleUnderline().run()} class={editor.isActive("underline")}>U</button>

        <button on:click={toggleLink} class={editor.isActive("link")}>Link</button>

        <button on:click={() => editor.chain().focus().toggleSubscript().run()} class={editor.isActive("subscript")}>Sub</button>

        <button on:click={() => editor.chain().focus().toggleSuperscript().run()} class={editor.isActive("superscript")}>Sup</button>

        <button on:click={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} class={editor.isActive("heading", { level: 1 })}>H1</button>

        <button on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} class={editor.isActive("heading", { level: 2 })}>H2</button>

        <button on:click={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} class={editor.isActive("heading", { level: 3 })}>H3</button>

        <button on:click={() => editor.chain().focus().setParagraph().run()} class={editor.isActive("paragraph")}>P</button>

        <button on:click={() => editor.chain().focus().setTextAlign("left").run()} class={editor.isActive({ textAlign: "left" })}>Left</button>

        <button on:click={() => editor.chain().focus().setTextAlign("center").run()} class={editor.isActive({ textAlign: "center" })}>Center</button>

        <button on:click={() => editor.chain().focus().setTextAlign("right").run()} class={editor.isActive({ textAlign: "right" })}>Right</button>

        <button on:click={() => editor.chain().focus().setTextAlign("justify").run()} class={editor.isActive({ textAlign: "justify" })}>Justify</button>

        <button on:click={() => editor.chain().focus().toggleBulletList().run()} class={editor.isActive("bulletList")}>Bullet</button>

        <button on:click={() => editor.chain().focus().toggleOrderedList().run()} class={editor.isActive("orderedList")}>Order</button>

        <button on:click={() => editor.chain().focus().undo().run()}>Undo</button>

        <button on:click={() => editor.chain().focus().redo().run()}>Redo</button>
    </div>
{/if}

<section class="container mx-auto">
    <div class="rounded border border-gray-500 border-opacity-50" bind:this={element}></div>
    <div class="mt-4 flex flex-col gap-4">
        <!-- <textarea bind:value={userInput} rows="4" cols="50" class="p-2 border border-gray-300 rounded" placeholder="Type something here..."></textarea> -->
        <button on:click={fetchResponse} class="mt-2 p-2 bg-blue-500 text-white rounded">Generate Your Article</button>
    </div>
    <p class="mt-4 text-sm text-gray-600">Type something in the editor, and AI will automatically generate content!</p>
</section>

<style>
    /** Modal. */
    .modal {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    /** Custom styling for select option to ensure text is visible on yellow background */
    select option {
        color: white;
        font-weight: bold;
    }
</style>
