import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getPostById } from "../../../utils/service/post";
import moment from "moment";

export default function PostDetailPage() {
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    enabled: !!id,
    queryKey: ["post-detail", id],
    queryFn: async () => {
      try {
        const { data, error } = await getPostById(id as string);
        if (error !== null)
          throw new Error(error.message, { cause: error.cause });
        return data;
      } catch (err: any) {
        console.log(err.message);
      }
    },
  });
  return (
    <main className="min-h-dvh pt-32 md:pt-36 lg:pt-44 px-[7%] dark:text-white ">
      <div className="flex flex-col items-center md:w-5/6 lg:w-3/5 xl:w-3/6  mx-auto">
        {isLoading ? (
          <>
            <div className="h-3.5 w-[150px] bg-black/20 dark:bg-white/20 animate-pulse rounded-full"></div>
            <div className="h-3 mt-6 bg-black/20 dark:bg-white/20 animate-pulse rounded-full"></div>
            <div className="h-3 mt-4 bg-black/20 dark:bg-white/20 animate-pulse rounded-full"></div>
            <div className="h-3 mt-4 bg-black/20 dark:bg-white/20 animate-pulse rounded-full"></div>
            <div className="h-3 mt-4 bg-black/20 dark:bg-white/20 animate-pulse rounded-full"></div>
            <div className="h-3 mt-6 w-[250px] bg-black/20 dark:bg-white/20 animate-pulse rounded-full"></div>
          </>
        ) : (
          <>
            <h1 className="text-center text-pretty md:text-lg">
              <span className="text-black/60 dark:text-white/50">from: </span>
              {data.from.slice(0, 50) + (data.from.length > 50 ? "..." : "") ||
                "anonymous"}
            </h1>
            <p className="mt-4 md:mt-8 text-lg text-center md:text-xl">
              {data.body}
            </p>

            <h1 className="text-black/50 mt-8 md:mt-12 dark:text-white/50 md:text-base text-sm">
              Sent on {moment(data.created_at).format("MMMM Do YYYY, h:mm A")}
            </h1>
          </>
        )}
      </div>
    </main>
  );
}
