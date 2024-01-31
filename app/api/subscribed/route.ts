import { db } from "@/db";
import { subscribers } from "@/db/schema";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (email) {
      const req = await db.insert(subscribers).values({ email: email });
      return new Response("Successfully Subscribed", { status: 200 });
    } else {
      return new Response("Please make sure to pass an input", { status: 400 });
    }
  } catch (err) {
    return new Response("Please try again with valid input", { status: 404 });
  }
}
