import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { Noto_Serif_SC } from "@next/font/google";
import { useEffect, useState } from "react";
import { Theme } from "../components/Header";

const notoSerif = Noto_Serif_SC({
  weight: ["400"],
  subsets: ["chinese-simplified", "latin"],
  variable: "--font-noto-serif",
});

export default function App({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState(Theme.System);
  const [themeString, setThemeString] = useState("");
  useEffect(() => {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (
      localStorage.theme === "Dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setThemeString(" dark ");
    } else {
      setThemeString(" ");
    }
  }, [theme]);
  return (
    <div
      className={`${notoSerif.variable} font-noto-serif font-thin ${themeString}`}
    >
      <Layout theme={theme} setTheme={setTheme}>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}
