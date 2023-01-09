import Link from "next/link";
import Image from "next/image";
import ThemeSwitch from "./themeSwitch";
import { useState } from "react";

const paths: string[] = ["model", "posts"];
export enum Theme {
  Light = "Light",
  Dark = "Dark",
  System = "System",
}

export default function Header({ setTheme }: { setTheme: Function }) {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <header aria-label="Site Header" className={`bg-white`}>
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        {/*<Link className="block text-teal-600" href="/">*/}
        {/*<span className="sr-only">Home</span>*/}
        {/*  <Image*/}
        {/*src="/favicon.ico"*/}
        {/*alt="Orange Logo"*/}
        {/*width={72}*/}
        {/*height={16}*/}
        {/*/>*/}
        {/*</Link>*/}

        <div className="flex flex-1 items-center justify-end md:justify-between">
          <nav aria-label="Site Nav" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm">
              <NavMenuList />
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4">
              {/*<ThemeSwitch setTheme={setTheme}></ThemeSwitch>*/}
            </div>

            <button
              className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden"
              onClick={() => setMenuVisible(!menuVisible)}
            >
              <span className="sr-only">Toggle menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 stroke-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  // stroke-linecap="round"
                  // stroke-linejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <div
                className={
                  (menuVisible ? "" : "hidden ") +
                  "absolute right-0 z-10 mt-4 w-56 origin-top-right rounded-md border border-gray-100 bg-white shadow-lg"
                }
                role="menu"
              >
                <ul>
                  <NavMenuList />
                </ul>
              </div>
            </button>
          </div>
        </div>
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
            className="text-gray-500 transition hover:text-gray-500/75"
            href={`/${path}`}
          >
            {path}
          </Link>
        </li>
      ))}
    </>
  );
}
