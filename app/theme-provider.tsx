"use client";

import React, { createContext } from "react";

const ThemeContext = createContext("system");

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeContext.Provider value={"system"}>{children}</ThemeContext.Provider>
  );
}
