import TextArea from "react-textarea-autosize";
import type { Post } from "../../../types/post";
import { useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router";
import { createNewPost } from "../../../utils/service/post";

export default function CreateNewPostPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [data, setData] = useState<Post>({
    body: "",
    from: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (data: Post) => async (e: Event) => {
    setIsLoading(true);
    try {
      e.preventDefault();
      if (data.body.length == 0)
        return setErrors({ body: "field ini harus di isi" });
      await createNewPost(data);
      navigate("/post");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <main className="min-h-dvh px-[7%] py-6 pt-24 md:pt-36 dark:text-white">
      <div className="flex flex-col md:justify-center md:mx-auto md:text-center md:container md:w-2/3 lg:w-2/4">
        <h1 className="font-semibold text-2xl md:text-3xl">Buat Post</h1>
        <p className="text-black/50 text-sm md:text-base dark:text-white/50">
          Apapun yang kamu rasakan, tuliskan disini
        </p>
        <form
          onSubmit={handleSubmit(data) as any}
          className="mt-8"
          method="POST"
        >
          <div className="flex flex-col">
            <input
              type="text"
              id="from"
              value={data.from}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setData((prev) => ({ ...prev, from: e.target.value }))
              }
              className="px-2.5 py-1.5 border dark:border-white/20 border-black/20 rounded-md focus:outline-none "
              placeholder="From (optional)"
            />
            <div className="flex flex-col">
              <TextArea
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  setData((prev) => ({ ...prev, body: e.target.value }))
                }
                maxRows={13}
                defaultValue={data.body}
                minRows={6}
                className="px-2.5 resize-none py-1.5 rounded-md dark:border-white/20 focus:outline-none border  border-black/20 mt-4"
                placeholder="Tuliskan ceritamu disini"
              ></TextArea>
              {!!errors.body && (
                <small className="text-red-500 mt-1">{errors?.body}</small>
              )}
            </div>
          </div>
          <button
            type="submit"
            className=" px-3 py-2 rounded-md disabled:bg-gray-200 flex justify-center shadow disabled:text-white text-center w-full dark:bg-white dark:text-black bg-black text-white mt-6"
          >
            {isLoading ? (
              <img
                src="/gif/loader.gif"
                className="invert dark:invert-0 size-6"
                alt=""
              />
            ) : (
              "Kirim"
            )}
          </button>
        </form>
      </div>
    </main>
  );
}
