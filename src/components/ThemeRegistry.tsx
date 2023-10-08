"use client";

import { CssVarsProvider, getInitColorSchemeScript } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import { ReactNode } from "react";

export default function ThemeRegistry({ children }: { children: ReactNode }) {
  getInitColorSchemeScript({ defaultMode: "dark" });

  return (
    <>
      {getInitColorSchemeScript()}
      <CssVarsProvider defaultMode="system">
        {/* the custom theme is optional */}
        <CssBaseline />
        {children}
      </CssVarsProvider>
    </>
  );
}
