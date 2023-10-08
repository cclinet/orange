import { ReactNode } from "react";
import ThemeRegistry from "@/app/ThemeRegistry";
export const metadata = {
  title: "Orange",
  description: "personal website for cclin",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh">
      <body>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
