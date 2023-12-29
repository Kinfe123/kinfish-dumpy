import React from "react";
import { EvervaultCard, Icon } from "../ui/card-binary";
import { Separator } from "./separator";
import Link from "next/link";
import ButtonStd from "./button-std";

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

      <ButtonStd route={props.slug} text="Read More" />
    </div>
  );
}
