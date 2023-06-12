import Link from "next/link";

const paths: { name: string; link: string }[] = [
  { name: "home", link: "/" },
  { name: "post", link: "/post" },
  { name: "about", link: "/about" },
];

export default function NavBar({}) {
  return (
    <nav
      aria-label="Site Nav"
      className="flex items-center mx-auto gap-6 px-4 sm:px-6 lg:px-8 text-sm lg:text-lg mt-4"
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
