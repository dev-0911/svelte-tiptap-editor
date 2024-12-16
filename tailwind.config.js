/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "../templates/**/*.html",
    "./src/**/*.css",
    "./src/**/*.{html,svelte,ts}",
  ],
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
  plugins: [],
};
