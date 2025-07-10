import { forwardRef } from "react";
import type { Post as PostType } from "../../../types/post";
import moment from "moment";
import { useNavigate } from "react-router";

const Post = forwardRef<HTMLDivElement, { post: PostType }>(
  ({ post, ...props }, ref) => {
    const n = useNavigate();
    return (
      <div
        onClick={() => n(`/post/${post.id}`)}
        {...props}
        ref={ref}
        className="border flex flex-col border-black/10 shadow dark:border-white/10 rounded-lg h-[11.5rem] "
      >
        <div className="bg-black/5 dark:bg-white/5 lg:text-base py-2 px-3 rounded-t-lg">
          <h1>
            <span className="text-black/50 dark:text-white/50">from: </span>
            {post.from.slice(0, 20) + (post.from.length > 20 ? "..." : "") ||
              "anonymous"}
          </h1>
        </div>
        <p className=" mt-1 px-3  text-pretty pb-2">
          {post.body.slice(0, 100) + (post.body.length > 100 ? "..." : "")}
        </p>{" "}
        <div className="px-3 mt-auto py-2">
          <h1 className="text-black/50 dark:text-white/50 text-sm">
            Sent on {moment(post.created_at).format("MMMM Do YYYY, h:mm A")}
          </h1>
        </div>{" "}
      </div>
    );
  }
);

export { Post };
