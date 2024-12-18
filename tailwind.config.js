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
                customColor: "#123456",
            },
        },
    },
    plugins: [flowbitePlugin]
};
