import { Hono } from "hono";
import { db } from "./database";
import { users } from "./database/schema";
import { serveStatic } from "hono/bun";
import { Layout } from "hono/dist/types/context";
import { html } from "hono/html";
import { showRoutes } from "hono/dev";

const auth = new Hono().basePath("/auth").get("/", (c) => c.text("auth"));

const workspaces = auth
  .basePath("/workspaces")
  .get("/", (c) => c.text("Workspaces"));

const projects = workspaces.basePath("/:workspaceId/projects").get("/", (c) => {
  return c.text(` Workspace is ${c.req.param("workspaceId")}`);
});

const routes = new Hono()
  .route("/", auth)
  .route("/", workspaces)
  .route("/", projects);

showRoutes(routes);

export default routes;
