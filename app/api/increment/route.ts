import { Redis } from "@upstash/redis";

export const config = {
  runtime: "edge",
};
const redis = Redis.fromEnv();
export async function POST(req: Request) {
  const body = await req.json();
  const { slug } = body;
  if (!slug) {
    return new Response("Slug is not provided", { status: 404 });
  }
  const ip = req.headers.get("x-forwarded-for") ?? "";
  const buf = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(ip)
  );
  const hash = Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  const isNew = await redis.set(["deduplicate", hash, slug].join(":"), true, {
    nx: true,
    ex: 24 * 60 * 60,
  });
  if(!isNew){
    return new Response('User has already viewed the page' , {status:202})
  }
  const res = await redis.incr(["pageviews", "projects", slug].join(":"));
  console.log('The number is : ' , res)
  return new Response('The user has successfully added to the viewer list', {status: 200})
  
}

// export async function GET(req: Request) {}
