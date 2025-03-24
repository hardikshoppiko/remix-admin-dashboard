import { redirect } from "@remix-run/node";
import { getUserFromSession } from "./session.server";

export async function requireAuth(request) {
  const user = await getUserFromSession(request);
  if (!user) {
    const url = new URL(request.url);
    throw redirect(`/login?redirectTo=${url.pathname}`);
  }
  return user;
}

async function getSession(request) {
  const cookie = request.headers.get("Cookie");
  if (!cookie) {
    return new Map();
  }
  const session = cookie.split(";").find(c => c.trim().startsWith("session="));
  if (!session) {
    return new Map();
  }
  const sessionValue = session.split("=")[1];
  try {
    return new Map(Object.entries(JSON.parse(decodeURIComponent(sessionValue))));
  } catch {
    return new Map();
  }
} 