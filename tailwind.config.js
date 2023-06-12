const { fontFamily } = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
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
