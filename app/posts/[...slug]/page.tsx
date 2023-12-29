import { notFound } from "next/navigation";
import { allPosts, allAuthors } from "contentlayer/generated";

import { Metadata } from "next";
import { Mdx } from "@/components/mdx-components";
import { ChevronLeft, ChevronLeftCircle } from "lucide-react";
import Link from "next/link";
import { cn, formatDate } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";

interface PostProps {
  params: {
    slug: string[];
  };
}

async function getPostFromParams(params: PostProps["params"]) {
  const slug = params?.slug?.join("/");
  const post = allPosts.find((post) => post.slugAsParams === slug);

  if (!post) {
    null;
  }

  return post;
}

export async function generateMetadata({
  params,
}: PostProps): Promise<Metadata> {
  const post = await getPostFromParams(params);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export async function generateStaticParams(): Promise<PostProps["params"][]> {
  return allPosts.map((post) => ({
    slug: post.slugAsParams.split("/"),
  }));
}

export default async function PostPage({ params }: PostProps) {
  const post = await getPostFromParams(params);
  const authors = post!.authors.map((author) =>
    allAuthors.find(({ slug }) => slug === `/authors/${author}`)
  );

  // console.log("The authors: " , authors)
  if (!post) {
    notFound();
  }

  return (
    <div className="container font-heading2 relative max-w-4xl py-6 gap-2">
      <Link
        href="/posts"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-[-200px] top-14 hidden xl:inline-flex"
        )}
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        See all posts
      </Link>
      <div className="flex flex-col justify-center items-center">
        {post.date && (
          <time
            dateTime={post.date}
            className="block text-sm text-muted-foreground mx-auto"
          >
            {formatDate(post.date)}
          </time>
        )}
        <h1 className="mt-2 inline-block text-center font-headingAlt text-5xl dark:bg-gradient-to-tr dark:from-zinc-400/10 dark:via-white/90 dark:text-transparent dark:bg-clip-text dark:to-white/10  leading-tight lg:text-6xl">
          {post.title}
        </h1>
      </div>
      {authors?.length ? (
        <div className="mt-4 flex space-x-4 flex-col justify-center items-center">
          {authors.map((author) =>
            author ? (
              <div
                key={author._id}
                className="flex flex-col gap-1 justify-center items-center"
              >
                <Link
                  key={author._id}
                  href={`https://twitter.com/${author.twitter}`}
                  className="flex items-center space-x-2 text-sm"
                >
                  <Image
                    src={author.avatar!}
                    alt={author.name!}
                    width={42}
                    height={42}
                    className="rounded-full bg-white"
                  />
                  <br />
                  <div className="flex-1 text-left leading-tight">
                    <p className="font-medium">{author.name}</p>
                    <p className="text-[12px] text-muted-foreground">
                      @{author.twitter}
                    </p>
                  </div>
                </Link>
                <p className="text-muted-foreground">{author.description}</p>
              </div>
            ) : null
          )}
        </div>
      ) : null}
      <article className=" font-heading2  prose dark:prose-invert   relative max-w-4xl py-24 md:py-7 lg:py-16">
        {post.image && (
          <div className="bg-gradient-to-tr from-purple-500/20 via-purple-400/5 to-purple-400/10 rounded-2xl outline-none border-none">
            <Image
              src={post.image}
              alt={post.title}
              width={1000}
              height={405}
              className="my-10 rounded-2xl bg-transparent transition-colors border-2 p-[2px] outline-none "
              priority
            />
          </div>
        )}
        <Mdx code={post.body.code} />
        <hr className="mt-12" />

        {/* <div className="mt-10">
      <UserSubscription />
    </div> */}
        <div className="flex justify-center py-6 lg:py-10">
          <Link
            href="/blog"
            className={cn(buttonVariants({ variant: "ghost" }))}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            See all posts
          </Link>
        </div>
      </article>
    </div>
  );
}
