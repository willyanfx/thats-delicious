import { Context, Next } from "hono";
import { getCookie } from "hono/cookie";
import { verify } from "hono/jwt";
import {
  SESSION_COOKIE_NAME,
  deleteSessionCookie,
  validateSession,
} from "../lib/sessions";
import type { JWTPayload } from "../lib/types";

export async function authMiddleware(c: Context, next: Next) {
  try {
    const token = getCookie(c, SESSION_COOKIE_NAME);
    if (!token) {
      return c.redirect("/login");
    }

    const payload = (await verify(token, c.env.JWT_SECRET)) as JWTPayload;

    const isValid = await validateSession(payload.sessionId);
    if (!isValid) {
      deleteSessionCookie(c);
      return c.redirect("/login");
    }

    c.set("user", { id: payload.id, username: payload.username });
    c.set("sectionId", payload.sessionId);
  } catch (error) {
    console.error(error);
    deleteSessionCookie(c);
  }
  await next();
}
