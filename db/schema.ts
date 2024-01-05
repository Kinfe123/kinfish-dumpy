import { serial, text, timestamp, pgTable } from "drizzle-orm/pg-core";

export var visitor = pgTable("visitor", {
  id: serial("id"),
  name: text("name"),
  
});
export var guesser = pgTable("guesser", {
  id: serial("id"),
  name: text("name"),
  phone: text('phone'),
  guess: text('guess')

  
});



