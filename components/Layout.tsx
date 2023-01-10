import Head from "next/head";
import { useState } from "react";
import { useEffect } from "react";
import Header, { Theme } from "./Header";
export default function Layout({ children }: any) {
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
    <>
      <Head>
        <title>Orange</title>
        <meta name="description" content="orange" />
      </Head>
      <div className={`mx-auto flex flex-col ${themeString} max-w-xl `}>
        <Header setTheme={setTheme} />
        <main className={`mt-32 px-4 sm:px-6 lg:px-8`}>{children}</main>
      </div>
    </>
  );
}
