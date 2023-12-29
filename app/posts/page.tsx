import Image from "next/image";
import Link from "next/link";
import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";

import { formatDate } from "@/lib/utils";
import { EvervaultCard } from "@/components/ui/card-binary";
import { PostCard } from "@/components/ui/card-binary-view";
import Spotlight from "@/components/ui/Spotlight";
import BlogHeader from "@/components/ui/blog-header";

export const metadata = {
  title: "Blog",
};

export default async function BlogPage() {
  const posts = allPosts
    .filter((post) => post.date)
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date));
    });

  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div>
        <Spotlight fill="#9284D4" className="-rotate-1" />
      </div>
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        {/* <div className="flex-1 space-y-4">
          <h1 className="inline-block fn font-headingAlt bg-gradient-to-tr from-white/50 bg-clip-text text-transparent to-white text-4xl tracking-tight lg:text-5xl">
            What <span className="mx-[3px]"></span>i <span className="mx-[3px]"></span> thought
          </h1>
          <p className="text-xl  text-muted-foreground">
           Homemade thought and farms - all the magic 
          </p>
        </div> */}
        <BlogHeader />
      </div>

      <hr className="my-8" />
      {posts?.length ? (
        <div className="grid gap-10 sm:grid-cols-2">
          {posts.map((post, index) => (
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
  );
}
