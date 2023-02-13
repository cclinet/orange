// These styles apply to every route in the application
import "./globals.css";
import { Italianno } from "@next/font/google";
import React from "react";
import NavBar from "./navBar";
import type { Metadata } from "next";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "cclin's Orange",
  description: "personal website of cclin which record life and knowledge",
};

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
    <html lang="zh" className={`${italianno.variable}`}>
      <body
        className={"flex flex-col px-4 mx-auto max-w-xl min-h-screen  bg-white"}
      >
        <NavBar />
        <main className={"grow"}>{children}</main>
      </body>
    </html>
  );
}
