import { serial, text, timestamp, pgTable } from "drizzle-orm/pg-core";

export var visitor = pgTable("visitor", {
  id: serial("id"),
  name: text("name"),
  
});