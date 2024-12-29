import { Elysia } from "elysia";
import { db } from "./database";
import { users } from "./database/schema";
import swagger from "@elysiajs/swagger";
import { html, Html } from "@elysiajs/html";
import { storeController } from "./controllers/storeController";

const app = new Elysia()
  // .use(swagger())
  .use(html())
  .get("/", () => {
    try {
      // Now you can safely query the users table
      const allUsers = db.select().from(users).all();

      return {
        status: 200,
        body: allUsers,
      };
    } catch (error) {
      console.error("Error querying users:", error);
    }
  })
  .use(storeController)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

export type App = typeof app;
