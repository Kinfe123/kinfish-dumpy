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
    <div className=" relative gap-1 h-full py-0 mt-0 w-screen overflow-hidden font-subheading">


      <div className=" relative w-full min-h-[calc(100vh-600px)] border-b-[0.1px]  border-accent  mt-[-20px] py-10  z-20  ml-0">
        <div className="absolute top-0 z-[-2] h-full w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]"></div>
        <div className="absolute top-[-150px] left-0  bg-gradient-to-br from-purple-400/20 blur-lg via-transparent to-transparent w-screen h-[450px]"></div>
        <div className="absolute top-0 left-0 right-0  h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
        {/* <div className="absolute top-0 right-0  h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div> */}

        <div>
          <Views slug={post.slug} />
        </div>
        <div className="flex flex-col justify-end items-end px-10">
          {post.date && (
            <time
              dateTime={post.date}
              className="block ml-auto text-md text-muted-foreground"
            >
              <EyeIcon className="inline w-4 h-4 text-muted-foreground mr-1" />  {views} <span className="mx-1"></span> {` `} ·{" "} <span className="mx-1"></span>   {formatDate(post.date)} <span className="mx-1"></span> {` `} ·{" "}
              <span className="mx-1"></span> {` `} {post.readTime} {` min`}
            </time>
          )}
          <h1 className="flex mt-2 text-6xl sm:text-7xl max-w-5xl  text-right  md:text-8xl lg:text-9xl leading-tight ml-auto  dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-tr font-headingAlt dark:from-zinc-400/10 dark:via-white/90 dark:to-white/10">
            {post.title}
          </h1>
          <p className="text-muted-foreground max-w-5xl mr-1 text-right text-xl md:text-xl">{post.description}</p>
        </div>

        {authors?.length ? (
          <div className="flex flex-col justify-center items-start mt-4 space-x-2 pr-20">
            {authors.map((author) =>
              author ? (
                <div
                  key={author._id}
                  className="flex flex-col gap-1 px-10 justify-end items-center"
                >

                  <Link
                    key={author._id}
                    href={`https://twitter.com/${author.twitter}`}
                    className="flex items-center justify-end  space-x-5 text-sm"
                  >
                    <AnimatedTooltip items={authorFormat} />
                    <br />
                    <div className="flex-1 leading-tight text-right">
                      <p className="font-medium text-md uppercase">{author.name}</p>
                      <p className="text-[12px] text-muted-foreground">
                        @{author.twitter}
                      </p>
                    </div>

                  </Link>
                  <div className="flex justify-center mt-3 items-center">
                    <Link
                      href="/posts"
                      className={cn(
                        buttonVariants({ variant: "ghost" }),
                        "inline-flex hover:bg-transparent"
                      )}
                    >
                      <ChevronLeft className="mr-2 w-4 h-4" />
                      See all posts
                    </Link>
                  </div>
                </div>
              ) : null
            )}
          </div>
        ) : null}
      </div>
      <article className="relative container mx-w-4xl flex-col py-24 max-w-4xl md:py-7 lg:py-16 font-heading2 prose text-[16.9px] dark:prose-invert">
        {post.image && (
          <div className="bg-gradient-to-tr to-transparent rounded-2xl border-none outline-none from-transparent/95">
            {/* <Image
              src={post.image}
              alt={post.title}
              width={1000}
              height={405}
              className="my-10 bg-transparent rounded-2xl border-2 transition-colors outline-none p-[2px]"
              priority
            /> */}
          </div>
        )}
        <Mdx code={post.body.code} />
        <hr className="mt-12" />

        {/* <div className="mt-10">
      <UserSubscription />
    </div> */}
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
