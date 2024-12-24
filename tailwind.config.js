/** @type {import('tailwindcss').Config} */
import flowbitePlugin from "flowbite/plugin";

export default {
    content: ["../templates/**/*.html", "./src/**/*.css", "./src/**/*.{html,svelte,ts}", "./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}"],
    theme: {
        fontFamily: {
            sans: ["Tahoma", "ui-sans-serif", "sans-serif"],
            serif: ["Helvetica", "ui-serif", "serif"],
            mono: ["Courier New", "ui-monospace", "monospace"],
        },
        extend: {
            colors: {
                background: {
                    DEFAULT: "var(--background-color-main)",
                    hovered: "var(--background-color-main-hovered)",
                    focused: "var(--background-color-main-focused)",
                    selected: "var(--background-color-main-selected)",
                    disabled: "var(--background-color-main-disabled)",
                    toolbar: {
                        DEFAULT: "var(--background-color-toolbar)",
                        hovered: "var(--background-color-toolbar-hovered)",
                        focused: "var(--background-color-toolbar-focused)",
                        selected: "var(--background-color-toolbar-selected)",
                        disabled: "var(--background-color-toolbar-disabled)",
                    },
                },
                text: {
                    DEFAULT: "var(--text-color-main)",
                    hovered: "var(--text-color-main-hovered)",
                    focused: "var(--text-color-main-focused)",
                    selected: "var(--text-color-main-selected)",
                    disabled: "var(--text-color-main-disabled)",
                    toolbar: {
                        DEFAULT: "var(--text-color-toolbar)",
                        hovered: "var(--text-color-toolbar-hovered)",
                        focused: "var(--text-color-toolbar-focused)",
                        selected: "var(--text-color-toolbar-selected)",
                        disabled: "var(--text-color-toolbar-disabled)",
                    },
                },
                border: {
                    DEFAULT: "var(--border-color-main)",
                    hovered: "var(--border-color-main-hovered)",
                    focused: "var(--border-color-main-focused)",
                    selected: "var(--border-color-main-selected)",
                    disabled: "var(--border-color-main-disabled)",
                    toolbar: {
                        DEFAULT: "var(--border-color-toolbar)",
                        hovered: "var(--border-color-toolbar-hovered)",
                        focused: "var(--border-color-toolbar-focused)",
                        selected: "var(--border-color-toolbar-selected)",
                        disabled: "var(--border-color-toolbar-disabled)",
                    },
                },
            },
        },
    },
    plugins: [flowbitePlugin],
};
