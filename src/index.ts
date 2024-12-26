import { Elysia } from "elysia";
import { db } from "./database";
import { users } from "./database/schema";

const app = new Elysia()
  .get("/", async () => {
    try {
      // Now you can safely query the users table
      const allUsers = db.select().from(users).all();
      console.log("Users:", allUsers);
      return {
        // This is the response object  that will be sent to the client
        status: 200,
        body: allUsers,
      };
    } catch (error) {
      console.error("Error querying users:", error);
    }
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
