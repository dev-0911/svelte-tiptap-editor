import { mount } from "svelte";
import "katex/dist/katex.min.css";

import "./styles/global.css";
import "./styles/tippy.css";
import "./styles/editor.css";
import "./styles/tiptap.css";

import App from "./App.svelte";

let editorInstance;

const editorElement = document.getElementById("sv-edit");
if (editorElement) {
    // editorInstance = mount(App, { target: editorElement, props: { name: "world1" } });
    editorInstance = mount(App, { target: editorElement, props: {} });
}

export { editorInstance };
