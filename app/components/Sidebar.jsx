import { Link, useLocation } from "@remix-run/react";
import { cn } from "../lib/utils";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
import { navigation, userNavigation } from "../config/navigation";

export default function Sidebar({ isCollapsed, onCollapse }) {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Close mobile sidebar when route changes
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 rounded-md bg-white shadow-md"
      >
        {isMobileOpen ? (
          <X className="w-5 h-5 text-gray-600" />
        ) : (
          <Menu className="w-5 h-5 text-gray-600" />
        )}
      </button>

      {/* Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed top-0 bottom-0 left-0 z-40 bg-white border-r border-gray-200 transition-all duration-300 ease-in-out",
        "md:translate-x-0", // Always show on desktop
        isMobileOpen ? "translate-x-0" : "-translate-x-full", // Slide in/out on mobile
        isCollapsed ? "md:w-20" : "md:w-64", // Collapsed state on desktop
        "w-64" // Full width on mobile when open
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <span className={cn(
              "text-xl font-bold text-gray-800 transition-opacity duration-300",
              isCollapsed ? "md:opacity-0" : "opacity-100"
            )}>
              OpenCart Admin
            </span>
            <button
              onClick={() => onCollapse(!isCollapsed)}
              className="p-2 rounded-md hover:bg-gray-100 transition-colors hidden md:block"
            >
              {isCollapsed ? (
                <ChevronRight className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-700 hover:bg-gray-50",
                    isCollapsed ? "md:justify-center" : "justify-start"
                  )}
                >
                  <item.icon className={cn(
                    "flex-shrink-0 w-5 h-5",
                    isCollapsed ? "md:mr-0" : "mr-3"
                  )} />
                  <span className={cn(
                    "transition-opacity duration-300",
                    isCollapsed ? "md:hidden" : "block"
                  )}>
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* User Navigation */}
          <div className="p-4 border-t border-gray-200">
            {userNavigation.map((item) => (
              <form key={item.name} action={item.href} method={item.method}>
                <button
                  type="submit"
                  className={cn(
                    "flex items-center w-full px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50 transition-colors",
                    isCollapsed ? "md:justify-center" : "justify-start"
                  )}
                >
                  <item.icon className={cn(
                    "flex-shrink-0 w-5 h-5",
                    isCollapsed ? "md:mr-0" : "mr-3"
                  )} />
                  <span className={cn(
                    "transition-opacity duration-300",
                    isCollapsed ? "md:hidden" : "block"
                  )}>
                    {item.name}
                  </span>
                </button>
              </form>
            ))}
          </div>
        </div>
      </div>
    </>
  );
} 