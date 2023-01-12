// These styles apply to every route in the application
import "./globals.css";
import { Noto_Serif_SC, Italianno } from "@next/font/google";
import React from "react";
import NavBar from "./navBar";
import ThemeProvider from "./theme-provider";

const notoSerif = Noto_Serif_SC({
  weight: ["400"],
  subsets: ["chinese-simplified", "latin"],
  variable: "--font-noto-serif",
});
const italianno = Italianno({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-italianno",
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh" className={`${notoSerif.variable} ${italianno.variable}`}>
      <body className={"flex flex-col mx-auto max-w-xl"}>
        <ThemeProvider>
          <NavBar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
