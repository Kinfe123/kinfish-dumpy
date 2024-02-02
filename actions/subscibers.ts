"use server";

import { db } from "@/db";
import { subscribers } from "@/db/schema";

export async function getSubscriberEmals() {
  const req = await db.select().from(subscribers);
  const subEmails = req.map((r) => r.email)

  return subEmails;

}
