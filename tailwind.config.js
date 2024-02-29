/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.tsx",
    "./index.html",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {},
  darkMode: "class",
  plugins: [
    require('flowbite/plugin'),
  ],
}