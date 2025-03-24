import { Outlet } from "@remix-run/react";
import Header from "./Header";

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
} 