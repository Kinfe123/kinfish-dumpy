import { allPosts } from "@/.contentlayer/generated";
import { Redis } from "@upstash/redis";
import { compareDesc } from "date-fns";
import { sumNums } from "./utils";

const redis = Redis.fromEnv();
export const getSlugs = () => {
  const posts = allPosts
    .filter((post) => post.date)
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date));
    });

  return posts;
};

export const getViewCount = async () => {
  const allSlugs = getSlugs().map((p) => `pageviews:projects:${p.slug}`);
  const allViews = await redis.mget<(number | null)[]>(...allSlugs);
  // @ts-ignore
  return sumNums(allViews)
};
