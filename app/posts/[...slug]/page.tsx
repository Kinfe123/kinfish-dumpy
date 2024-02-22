import { notFound } from "next/navigation";
import { allAuthors, allPosts } from "contentlayer/generated";

import { Metadata } from "next";
import { Mdx } from "@/components/mdx-components";
import { ChevronLeft, ChevronLeftCircle, EyeIcon, View } from "lucide-react";
import Link from "next/link";
import { cn, formatDate } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Views from "@/components/views";
import { Redis } from "@upstash/redis";
import { AnimatedTooltip } from "@/components/animated-tooltip";

const redis = Redis.fromEnv();
interface PostProps {
  params: {
    slug: string[];
  };
}

interface AuthorProps {
  id: string;
  name: string;
  designation: string;
  image: string;
}

export const revalidate = 30;

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
  const { title, image, description, slug } = post;
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: `${title} - KiNFiSH Blog`,
      description,
      type: "article",
      url: `https://kinfish-dumpy.vercel.app/posts/${slug}`,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function PostPage({ params }: PostProps) {
  const post = await getPostFromParams(params);
  const authors = post!.authors.map((author) =>
    allAuthors.find(({ slug }) => slug === `/authors/${author}`)
  );

  if (!post) {
    notFound();
  }
  const views =
    (await redis.get<number>(["pageviews", "projects", post.slug].join(":"))) ??
      0;

  const parseData = () => {
    let res: AuthorProps[] = [];

    if (authors) {
      authors.map((a) => {
        let user = {
          id: a!._id ?? "",
          name: a!.name ?? "",
          designation: a!.description ?? "",
          image: a!.avatar ?? "",
        };
        res.push(user);
      });
    }
    return res;
  };
  const authorFormat = parseData();

  return (
    <div className="container relative gap-2 py-14 max-w-4xl font-subheading">
      <Link
        href="/posts"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-[-200px] top-14 hidden xl:inline-flex",
        )}
      >
        <ChevronLeft className="mr-2 w-4 h-4" />
        See all posts
      </Link>
      <div>
        <Views slug={post.slug} />
      </div>
      <div className="flex flex-col justify-center items-center">
        {post.date && (
          <time
            dateTime={post.date}
            className="block mx-auto text-md text-muted-foreground"
          >
            {formatDate(post.date)} <span className='mx-1'></span> {` `} · <span className='mx-1'></span> {` `} {post.readTime} {` min`}
          </time>
        )}
        <h1 className="inline-block mt-2 text-5xl leading-tight text-center lg:text-6xl dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-tr font-headingAlt dark:from-zinc-400/10 dark:via-white/90 dark:to-white/10">
          {post.title}
        </h1>
      </div>
      {authors?.length
        ? (
          <div className="flex flex-col justify-center items-center mt-4 space-x-4">
            {authors.map((author) =>
              author
                ? (
                  <div
                    key={author._id}
                    className="flex flex-col gap-1 justify-center items-center"
                  >
                    <div className="flex gap-2 justify-center items-center">
                      <EyeIcon className="w-4 h-4 text-muted-foreground" />
                      <p className="font-subheading text-muted-foreground">
                        {views}
                      </p>
                    </div>
                    <Link
                      key={author._id}
                      href={`https://twitter.com/${author.twitter}`}
                      className="flex items-center space-x-5 text-sm"
                    >
                      {
                        /* <Image
                    src={author.avatar!}
                    alt={author.name!}
                    width={42}
                    height={42}
                    className="bg-white rounded-full"
                  /> */
                      }
                      <AnimatedTooltip items={authorFormat} />
                      <br />

                      <div className="flex-1 leading-tight text-left">
                        <p className="font-medium">{author.name}</p>
                        <p className="text-[12px] text-muted-foreground">
                          @{author.twitter}
                        </p>
                      </div>
                    </Link>
                  </div>
                )
                : null
            )}
          </div>
        )
        : null}
      <article className="relative py-24 max-w-4xl md:py-7 lg:py-16 font-heading2 prose text-[16.9px] dark:prose-invert">
        {post.image && (
          <div className="bg-gradient-to-tr to-transparent rounded-2xl border-none outline-none from-transparent/95">
            <Image
              src={post.image}
              alt={post.title}
              width={1000}
              height={405}
              className="my-10 bg-transparent rounded-2xl border-2 transition-colors outline-none p-[2px]"
              priority
            />
          </div>
        )}
        <Mdx code={post.body.code} />
        <hr className="mt-12" />

        {
          /* <div className="mt-10">
      <UserSubscription />
    </div> */
        }
        <div className="flex justify-end pt-5 mt-10 border-t border-none">
          <Link
            href={`https://github.com/Kinfe123/kinfish-dumpy/blob/main/content/posts/${params.slug}.mdx`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-500 transition-colors hover:opacity-[80%]"
          >
            <p>Found a typo? Edit this page →</p>
          </Link>
        </div>
      </article>
    </div>
  );
}
