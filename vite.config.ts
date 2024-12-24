import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import path from "path";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

export default defineConfig({
    plugins: [svelte()],
    build: {
        minify: true,
        outDir: "./static",
        emptyOutDir: false,
        chunkSizeWarningLimit: 1500,
        rollupOptions: {
            input: {
                main: "src/main.ts",
            },

            output: {
                chunkFileNames: "js/[name].js",
                entryFileNames: "js/[name].js",

                assetFileNames: ({ name }) => {
                    if (name && /\.(gif|jpe?g|png|svg)$/.test(name)) {
                        return "images/[name][extname]";
                    }

                    if (name && /\.css$/.test(name)) {
                        return "css/[name][extname]";
                    }
                    return "assets/[name][extname]";
                },
            },
            external: [],
        },
    },
    publicDir: "assets",
    resolve: {
        alias: {
            $css: path.resolve(__dirname, "src/css"),
            $components: path.resolve(__dirname, "src/components"),
            $styles: path.resolve(__dirname, "src/styles"),
            $lib: path.resolve(__dirname, "src/lib"),
        },
    },
    css: {
        postcss: {
            plugins: [tailwindcss(), autoprefixer()],
        },
    },
});
