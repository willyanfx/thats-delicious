import { Hono } from "hono";

export const add = new Hono().basePath("/add");
// add/:id -> add a store with id if logged in

export const store = new Hono().basePath("/store");
// store/:id
// store/:id/edit -> need to be logged in
// store/:id/delete -> need to be logged in
// sore/:slug

export const tags = new Hono().basePath("/tags");
// tags/:tag

export const users = new Hono();
// /register for register new user
// /login for login
// /logout for logout
// /account
// /account/forgot
// /account/reset/:token
// /account/reset/:token -> confirm password

export const top = new Hono().get("/top", (c) => c.text("Top"));

export const api = new Hono().basePath("/api");
// seach
// stores/near
// stores/:id/heart
