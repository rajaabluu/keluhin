export default function Skeleton() {
  return (
    <div className="border flex flex-col border-black/10 shadow animate-pulse dark:border-white/10 rounded-lg h-[11.5rem] ">
      <div className="bg-black/5 dark:bg-white/5 lg:text-base py-2 px-3 rounded-t-lg">
        <h1>
          <div className="h-4 w-[250px] bg-black/20 dark:bg-white/20 animate-pulse rounded-full"></div>
        </h1>
      </div>
      <div className=" px-3 *:dark:bg-white/20  text-pretty pb-2 flex flex-col gap-2 mt-2">
        <div className="h-3 bg-black/20 animate-pulse rounded-full"></div>
        <div className="h-3 bg-black/20 animate-pulse rounded-full"></div>
        <div className="h-3 bg-black/20 animate-pulse rounded-full"></div>
        <div className="h-3 bg-black/20 animate-pulse rounded-full"></div>
      </div>
      <div className="px-3 mt-auto py-2">
        <div className="h-2.5 bg-black/20 dark:bg-white/20 animate-pulse rounded-full"></div>
      </div>{" "}
    </div>
  );
}
