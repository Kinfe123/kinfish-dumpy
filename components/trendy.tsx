import { allPosts } from "@/.contentlayer/generated";
import { PostCard } from "./ui/card-binary-view";
import { compareDesc } from "date-fns";
import { Separator } from "./ui/separator";
import ButtonStd from "./ui/button-std";
import Link from "next/link";
const Trendy = () => {
  const posts = allPosts
    .filter((post) => post.date)
    .sort((a, b) => {
      PostCard;
      return compareDesc(new Date(a.date), new Date(b.date));
    });

  const firstTwo = [posts[0], posts[1]];
  return (
    <div className="flex flex-col gap-5 justify-center items-center container max-w-4xl py-6 lg:py-10">
      <h1 className="relative z-10 text-lg md:text-7xl font-headingAlt  bg-clip-text text-transparent bg-gradient-to-b from-purple-300/90 to-white/90  text-center font-bold">
        Get the trendy one
      </h1>
      <Separator />

      <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between md:gap-8">
        <hr className="my-8" />
        {firstTwo?.length ? (
          <div className="grid gap-10 sm:grid-cols-2">
            {firstTwo.map((post, index) => (
              <PostCard
                key={post._id}
                title={post.title}
                description={post.description!}
                date={post.date}
                slug={post.slug}
              />

              // <article
              //   key={post._id}
              //   className="group relative flex flex-col space-y-2"
              // >
              //   {post.image && (
              //     <Image
              //       src={post.image}
              //       alt={post.title}
              //       width={804}
              //       height={452}
              //       className="rounded-md border bg-muted transition-colors"
              //       priority={index <= 1}
              //     />
              //   )}
              //   <h2 className="text-2xl font-extrabold">{post.title}</h2>
              //   {post.description && (
              //     <p className="text-muted-foreground">{post.description}</p>
              //   )}
              //   {post.date && (
              //     <p className="text-sm text-muted-foreground">
              //       {formatDate(post.date)}
              //     </p>
              //   )}
              //   <Link href={post.slug} className="absolute inset-0">
              //     <span className="sr-only">View Article</span>
              //   </Link>
              // </article>
            ))}
          </div>
        ) : (
          <p>No posts published.</p>
        )}
      </div>
      <div>
        <Link href={"/posts"}>
          <button className="bg-transparent mt-2 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">
            <span className="absolute inset-0 overflow-hidden rounded-full">
              <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
            </span>
            <div className="relative flex space-x-2 items-center z-10 rounded-full bg-transparent py-2.5 px-4 ring-1 ring-white/10 ">
              <span>{"Explore More"}</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M10.75 8.75L14.25 12L10.75 15.25"
                ></path>
              </svg>
            </div>
            <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Trendy;
