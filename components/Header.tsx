import Link from "next/link";
import ThemeSwitch from "./themeSwitch";

const paths: { name: string; link: string }[] = [
  { name: "home", link: "/" },
  { name: "posts", link: "posts" },
  { name: "model", link: "model" },
];
export enum Theme {
  Light = "Light",
  Dark = "Dark",
  System = "System",
}

export default function Header({ setTheme }: { setTheme: Function }) {
  return (
    <header
      aria-label="Site Header"
      className={`mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8`}
    >
      {/*<div className="flex flex-1 items-center justify-end md:justify-between">*/}
      {/*<nav aria-label="Site Nav" className="hidden md:block">*/}
      <nav aria-label="Site Nav" className="block">
        <ul className="flex items-center gap-6 text-sm">
          <NavMenuList />
        </ul>
      </nav>

      <div className="flex items-center gap-4">
        <div className="sm:flex sm:gap-4">
          {/*<ThemeSwitch setTheme={setTheme}></ThemeSwitch>*/}
        </div>
        {/*</div>*/}
      </div>
    </header>
  );
}

function NavMenuList() {
  return (
    <>
      {paths.map((path, index) => (
        <li key={index}>
          <Link
            className="text-gray-600 transition hover:text-gray-500/75"
            href={`/${path.link}`}
          >
            {path.name}
          </Link>
        </li>
      ))}
    </>
  );
}
