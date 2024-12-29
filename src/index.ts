import { Hono } from "hono";
import { db } from "./database";
import { users } from "./database/schema";

const app = new Hono();

app.get("/", (c) => {
  const allUsers = db.select().from(users).all();

  return c.json({
    status: 200,
    body: JSON.stringify(allUsers, null, 2),
  });
});

export default app;
