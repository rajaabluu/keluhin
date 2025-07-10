import { CirclePlus, StickyNote } from "lucide-react";
import { Link } from "react-router";

export default function IndexPage() {
  return (
    <main className="min-h-dvh px-[7%] py-5 pt-20 dark:text-white flex flex-col">
      <div className="pt-8 sm:pt-12 md:pt-16 lg:pt-24">
        <div>
          <h1 className="text-center text-3xl sm:text-4xl text-pretty font-semibold">
            mau ngeluh tapi gada tempat?{" "}
            <span className="bg-blue-500 text-white px-1">keluhin</span> aja
            disini!
          </h1>
          <p className="text-center text-black/50 dark:text-white/50 text-sm mt-3 sm:text-base lg:text-lg text-pretty">
            Luapkan isi hatimu. Tanpa penilaian. Tanpa nama.
          </p>
        </div>
        <div className="flex max-sm:flex-col text-center sm:items-center sm:*:min-w-[13rem] justify-center mt-12 gap-3 relative">
          <Link
            className="shadow-sm dark:text-black/80 shadow-black/50 relative rounded-md text-white text-sm"
            to={"/post/new"}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-blue-600 rounded-md blur"></div>
            <div className="px-3.5 py-2 rounded-md bg-black dark:bg-white flex items-center relative justify-center gap-2">
              <CirclePlus className="size-4" />
              <h1 className="max-sm:mr-5">Buat Post</h1>
            </div>
          </Link>
          <Link
            to={"/post"}
            className="text-sm bg-white dark:bg-black dark:border-white/20 shadow py-2 px-3.5 rounded-md border border-black/10 flex items-center justify-center"
          >
            <h1>Cari Post</h1>
          </Link>
        </div>
      </div>
      <div className="mt-auto flex justify-center text-sm items-center divide-x-2 gap-2 divide-black/20 text-black/50 dark:text-white/50 ">
        <h1 className="text-center pr-2">{"© " + new Date().getFullYear()}</h1>
        <h1>Made by @rajaabluu</h1>
      </div>
    </main>
  );
}
