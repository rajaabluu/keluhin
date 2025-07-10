import type { Post } from "../../types/post";
import supabase from "../db/supabase";

export const getAllPosts = async ({
  page,
  search,
}: {
  page: number;
  search?: string;
}) => {
  const limit = 5;
  const from = (page - 1) * limit;
  const to = page * limit - 1;
  let post = supabase
    .from("posts")
    .select("*", { count: "exact" }).order('created_at', {ascending: false})
    .range(from, to);

  if (!!search) post = post.textSearch("from", search);

  const result = await post;

  return {
    ...result,
    data: {
      data: result.data,
      pagination: {
        totalPages: result.count ? Math.ceil(result.count / limit) : 1,
        currentPage: page,
      },
    },
  };
};

export const createNewPost = async (data: Post) => {
  const result = await supabase.from("posts").insert(data);
  return result;
};

export const getPostById = async (id: string | number) => {
  const result = await supabase
    .from("posts")
    .select()
    .eq("id", Number(id))
    .single();
  return result;
};
