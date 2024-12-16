import { mount } from "svelte";
import "./css/app.css";

import Editor from "./lib/editor.svelte";

const editorElement = document.getElementById("sv-edit");

let editorInstance;

if (editorElement) {
    editorInstance = mount(Editor, {
        target: editorElement,
    });
}

export { editorInstance };
