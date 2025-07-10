import clsx from "clsx";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";

export default function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const theme = localStorage.getItem("theme");
    if (theme == null)
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    return theme == "dark";
  });

  const { pathname } = useLocation();

  const toggleDarkMode = () =>
    setIsDarkMode((prev) => {
      return !prev;
    });

  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", !isDarkMode ? "light" : "dark");
  }, [isDarkMode]);

  return (
    <nav className="px-[7%] py-4 fixed top-0 right-0 left-0 bg-white dark:bg-[#121212] shadow border-b border-b-slate-200 dark:border-white/10 flex items-center">
      <div>
        <Link to={"/"}>
          <h1 className="font-semibold dark:text-white text-lg md:text-xl">
            keluhin.
          </h1>
        </Link>
      </div>
      <div className="flex grow sm:text-base max-sm:text-[0.90rem] [&_a]:text-black [&_a]:dark:text-white items-center gap-4.5 md:gap-5 justify-end h-fit">
        <Link
          to={"/post"}
          className={clsx(
            pathname.startsWith("/post") && pathname !== "/post/new"
              ? ""
              : " !text-black/50 dark:!text-white/50"
          )}
        >
          Cari
        </Link>
        <Link
          to={"/post/new"}
          className={clsx(
            "mr-2",
            pathname == "/post/new" ? "" : "!text-black/50 dark:!text-white/50"
          )}
        >
          Buat
        </Link>
        <div
          onClick={toggleDarkMode}
          className="rounded-full cursor-pointer border hover:outline hover:outline-black/20 dark:hover:outline-white/50 bg-black/5 dark:bg-white/5 border-slate-200 dark:border-white/10 w-12"
        >
          <div
            className={clsx(
              "*:size-3 p-1 border bg-white dark:bg-black border-slate-200 dark:border-white/10 w-fit rounded-full dark:*:invert duration-300  ease-in-out",
              isDarkMode && "translate-x-[1.50rem]"
            )}
          >
            {isDarkMode ? (
              <Moon className={clsx(!isDarkMode && "opacity-0")} />
            ) : (
              <Sun
                className={clsx("stroke-black/50", isDarkMode && "opacity-0")}
              />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
