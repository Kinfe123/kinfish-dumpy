import { db } from "@/db";
import { subscribers } from "@/db/schema";
import { transporter } from "@/lib/email-helper";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (email) {
      const req = await db.insert(subscribers).values({ email: email });
      try {
        const req2 = await transporter.sendMail({
          from:`KinfeMichael Tariku <${process.env.USER_EMAIL}>`,
          to: email,
          subject: "Thanks for showing your interest for join the gang",
          text: "Hello there, Thanks for joining the farmer gang , I will keep in touch with you for an updates!... Stay Safe",
        });
        return new Response("Everything went fine", { status: 200 });
      } catch (err) {
        console.log("The error is  ", err);
      }

      return new Response("Successfully Subscribed", { status: 200 });
    } else {
      return new Response("Please make sure to pass an input", { status: 400 });
    }
  } catch (err) {
    return new Response("Please try again with valid input", { status: 404 });
  }
}
