import { Context } from "hono";
import { setCookie, deleteCookie } from "hono/cookie";
import { eq } from "drizzle-orm";
import { db } from "../database";
import { session, users } from "../database/schema";
import { JWTPayload } from "./types";
import { sign } from "hono/jwt";

const DAY_IN_MS = 1000 * 60 * 60 * 24;
export const SESSION_COOKIE_NAME = "auth-session";

export async function generateAuthToken(
  c: Context,
  user: { id: string; username: string },
  sessionId: string
) {
  const payload: JWTPayload = {
    id: user.id,
    username: user.username,
    sessionId,
  };

  return await sign(payload, c.env.JWT_SECRET, "HS256");
}

export async function createSession(userId: string) {
  const sessionId = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + DAY_IN_MS * 30);

  const newSession = {
    id: sessionId,
    userId,
    expiresAt,
  };

  await db.insert(session).values(newSession);
  return newSession;
}
export async function validateSession(sessionId: string) {
  const result = await db
    .select({
      user: { id: users.id, username: users.username },
      session: session,
    })
    .from(session)
    .where(eq(session.id, sessionId))
    .get();

  if (!result) {
    return null;
  }

  const sessionExpired =
    Date.now() >= new Date(result.session.expiresAt).getTime();

  if (sessionExpired) {
    await invalidateSession(sessionId);
    return false;
  }

  // Renew session if it's close to expiring
  const shouldRenew =
    Date.now() >= new Date(result.session.expiresAt).getTime() - DAY_IN_MS * 15;

  if (shouldRenew) {
    const newExpiresAt = new Date(Date.now() + DAY_IN_MS * 30);
    await db
      .update(session)
      .set({ expiresAt: newExpiresAt })
      .where(eq(session.id, sessionId));
  }

  return true;
}
export async function invalidateSession(sessionId: string) {
  await db.delete(session).where(eq(session.id, sessionId));
}
export async function setSessionCookie(
  c: Context,
  token: string,
  expiresAt: Date
) {
  setCookie(c, SESSION_COOKIE_NAME, token, {
    expires: expiresAt,
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax",
  });
}
export async function deleteSessionCookie(c: Context) {
  deleteCookie(c, SESSION_COOKIE_NAME);
}
