const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [...fontFamily.sans],
        serif: [...fontFamily.serif],
        mono: [...fontFamily.mono],
        italianno: ["var(--font-italianno)"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
