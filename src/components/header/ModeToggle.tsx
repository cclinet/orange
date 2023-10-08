"use client";

import { useColorScheme } from "@mui/joy/styles";
import Button from "@mui/joy/Button";
import IconButton from "@mui/joy/IconButton";
import { useEffect, useState } from "react";
import DarkMode from "@mui/icons-material/DarkMode";
import LightMode from "@mui/icons-material/LightMode";
export default function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // to avoid layout shift, render a placeholder button
    return <Button variant="outlined" color="neutral" sx={{ width: 120 }} />;
  }

  return (
    <IconButton onClick={() => setMode(mode === "dark" ? "light" : "dark")}>
      {mode === "dark" ? <LightMode /> : <DarkMode />}
    </IconButton>
  );
}
