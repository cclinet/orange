// These styles apply to every route in the application
import "./globals.css";
import { Italianno, ZCOOL_XiaoWei } from "@next/font/google";
import React from "react";
import NavBar from "./navBar";
import ThemeProvider from "./theme-provider";
export const revalidate = 86400;

const italianno = Italianno({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-italianno",
});
const zcoolXiaoWei = ZCOOL_XiaoWei({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-zcool-xiaowei",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="zh"
      className={`${italianno.variable} ${zcoolXiaoWei.variable}`}
    >
      <body className={"flex flex-col px-4 mx-auto max-w-xl"}>
        <ThemeProvider>
          <NavBar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
