// These styles apply to every route in the application
import "./globals.css";
import { Noto_Serif_SC, Italianno } from "@next/font/google";
import React from "react";
import Header from "./header";

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
      <body className={"flex flex-col max-w-screen-xl"}>
        <Header />
        {children}
      </body>
    </html>
  );
}
