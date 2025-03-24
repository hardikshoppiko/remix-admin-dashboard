import { cssBundleHref } from "@remix-run/css-bundle";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { getUserFromSession } from "./utils/session.server";
import Header from "./components/Header";
import tailwindStyles from "./styles/tailwind.css";

export const meta = () => {
  return [
    { title: "OpenCart Admin" },
    { name: "description", content: "OpenCart Admin Dashboard - Manage your online store" },
    { name: "viewport", content: "width=device-width,initial-scale=1" },
    { charSet: "utf-8" }
  ];
};

export const links = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  { rel: "stylesheet", href: tailwindStyles },
];

export const loader = async ({ request }) => {
  const user = await getUserFromSession(request);
  return json({ user });
};

export default function App() {
  const { user } = useLoaderData();

  return (
    <html lang="en" className="h-full bg-gray-50">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        {user ? (
          <div className="min-h-screen bg-gray-100">
            <Header />
            <main className="pt-16">
              <div className="md:p-4 lg:p-6">
                <Outlet />
              </div>
            </main>
          </div>
        ) : (
          <Outlet />
        )}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
} 