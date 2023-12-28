import React from "react";
import { EvervaultCard, Icon } from "../ui/card-binary";
import { Separator } from "./separator";
import Link from "next/link";

type PostCardProps = {
  title: string;
  description: string;
  slug: string;
  date: string;
};
export function PostCard(props: PostCardProps) {
  return (
    <div className="border border-black/[0.2] bg-gradient-to-tr from-purple-400/10 to-transparent dark:border-white/[0.2] flex flex-col items-start max-w-sm mx-auto p-4 relative h-[25rem] w-[25rem]">
      <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

      <EvervaultCard text={props.title} />
      <Separator className="mt-2 text-purple-900" />
      <h2 className="dark:text-white text-black mt-4 text-md font-light">
        {props.description}
      </h2>
      {/* <p className="text-sm border font-light dark:border-white/[0.2] border-black/[0.2] rounded-full mt-4 text-black dark:text-white px-2 py-0.5">
        Watch me hover
      </p> */}

      <Link href={`${props.slug}`}>
        <button className="bg-transparent mt-2 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">
          <span className="absolute inset-0 overflow-hidden rounded-full">
            <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
          </span>
          <div className="relative flex space-x-2 items-center z-10 rounded-full bg-transparent py-1.5 px-4 ring-1 ring-white/10 ">
            <span>{`Read More`}</span>
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
  );
}
