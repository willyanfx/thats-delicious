import { Hono } from "hono";
import { db } from "./database";
import { users } from "./database/schema";
import { serveStatic } from "hono/bun";
import { Layout } from "hono/dist/types/context";
import { html } from "hono/html";

const app = new Hono();

app.use("/public", serveStatic({ root: "./public" }));

app.get("/", (c) => {
  const allUsers = db.select().from(users).all();

  return c.render(
    `<Layout title="Home" siteName="My Site"> Users: ${allUsers} </Layout>`
  );
});

export default app;
