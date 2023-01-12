"use client";

import Link from "next/link";
import ThemeButton from "./themeButton";

const paths: { name: string; link: string }[] = [
  { name: "home", link: "/" },
  { name: "post", link: "/post" },
  { name: "journal", link: "/posts/journal" },
  { name: "model", link: "/model" },
];
// export enum Theme {
//   Light = "Light",
//   Dark = "Dark",
//   System = "System",
// }

export default function NavBar({}) {
  return (
    <nav
      aria-label="Site Nav"
      className="flex mx-auto items-center gap-6 px-4 sm:px-6 lg:px-8 text-sm mt-3"
    >
      {paths.map((path, index) => (
        <div key={index}>
          <Link
            className="text-gray-600 transition hover:text-gray-500/75"
            href={`${path.link}`}
          >
            {path.name}
          </Link>
        </div>
      ))}
    </nav>
  );
}
