import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllPosts } from "../../utils/service/post";
import { Fragment, useEffect, useState } from "react";
import { Post } from "../../components/ui/post";
import type { Post as PostType } from "../../types/post";
import { useInView } from "react-intersection-observer";
import { useSearchParams } from "react-router";
import { Search } from "lucide-react";
import Skeleton from "../../components/ui/post/skeleton";

export default function PostPage() {
  const [searchParam, setSearchParam] = useSearchParams();
  const [query, setQuery] = useState<string>(searchParam.get("search") || "");
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      refetchOnWindowFocus: false,
      initialPageParam: 1,
      queryKey: ["posts", searchParam.get("search") || ""],
      queryFn: async ({ pageParam }) => {
        const args: any = {
          page: pageParam,
        };
        if (searchParam.has("search")) args.search = searchParam.get("search");
        try {
          const { data, error } = await getAllPosts(args);
          if (error !== null) throw new Error(error.message);
          return data;
        } catch (err) {
          console.log(err);
        }
      },
      getNextPageParam: (data: any) =>
        data.pagination.totalPages > data.pagination.currentPage
          ? data.pagination.currentPage + 1
          : null,
    });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && !isFetchingNextPage && hasNextPage) fetchNextPage();
  }, [inView, hasNextPage, isFetchingNextPage]);

  useEffect(() => console.log("dataa", data), [data]);

  return (
    <main className="min-h-dvh pt-24 dark:text-white px-[7%] py-8">
      <div className="mt-6  mb-8 sm:mb-16 flex justify-center">
        <div className=" flex gap-1.5 items-center max-sm:w-[24rem] sm:w-[30rem] justify-center">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search sender..."
            className="focus:outline-none dark:border-white/20 grow border border-black/10 px-2 py-1.5 rounded-md"
          ></input>
          <div
            onClick={() => {
              setSearchParam({ search: query });
            }}
          >
            <Search className="size-9 p-2 bg-white rounded-md dark:bg-black invert" />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap lg:gap-5 pb-20 *:max-sm:w-full *:max-sm:max-w-[24rem] gap-4 justify-center *:sm:max-md:w-[48%] *:md:w-[20rem]">
        {!isLoading ? (
          data &&
          data.pages.length > 0 &&
          data?.pages.map((page: any, i) => (
            <Fragment key={i}>
              {page.data && page.data?.length > 0 ? (
                page?.data.map((post: PostType, index: number) => (
                  <Post key={index} post={post} />
                ))
              ) : (
                <div className="!h-full justify-center !w-full">
                  <h1
                    key={1}
                    className="text-black/50 dark:text-white/50 text-center md:-mt-4"
                  >
                    No Posts found.
                  </h1>
                </div>
              )}
            </Fragment>
          ))
        ) : (
          <>
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </>
        )}
        <div className="w-0 h-0" ref={ref}></div>
        {isFetchingNextPage && <Skeleton />}
      </div>
    </main>
  );
}
