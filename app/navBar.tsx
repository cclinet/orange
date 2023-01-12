"use client";

import Link from "next/link";
import ThemeButton from "./theme-button";

const paths: { name: string; link: string }[] = [
  { name: "home", link: "/" },
  { name: "post", link: "/post" },
  { name: "journal", link: "/post/journal" },
  { name: "model", link: "/model" },
];

export default function NavBar({}) {
  return (
    <nav
      aria-label="Site Nav"
      className="flex items-center mx-auto gap-6 px-4 sm:px-6 lg:px-8 text-sm mt-3"
    >
      {paths.map((path, index) => (
        <Link
          key={index}
          className="text-gray-600 transition hover:text-gray-500/75"
          href={`${path.link}`}
        >
          {path.name}
        </Link>
      ))}
    </nav>
  );
}
