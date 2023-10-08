import { ReactNode } from "react";
import ThemeRegistry from "@/components/ThemeRegistry";
import Grid from "@mui/joy/Grid";
import Header from "@/components/header/Header";
import Nav from "@/components/nav/Nav";
export const metadata = {
  title: "Orange",
  description: "personal website for cclin",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh">
      <body>
        <ThemeRegistry>
          <Grid container spacing={2} sx={{ flexGrow: 1 }}>
            <Header />
            <Nav />
            {children}
          </Grid>
        </ThemeRegistry>
      </body>
    </html>
  );
}
