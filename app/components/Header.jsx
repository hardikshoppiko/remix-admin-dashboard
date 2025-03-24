import { Link, useLocation } from "@remix-run/react";
import { cn } from "../utils/cn";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { navigation, userNavigation } from "../config/navigation";

export default function Header() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      {/* Backdrop for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      
      <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
        <div className="mx-auto">
          {/* Main Header */}
          <div className="flex items-center justify-between px-4 py-3">
            {/* Logo */}
            <div className="flex items-center">
              <span className="text-xl font-bold text-gray-800">
                <Link to="/">OpenCart Admin</Link>
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-4">
              {navigation.map((item) => {
                const isActive = item.items 
                  ? item.items.some(subItem => subItem.href === location.pathname)
                  : location.pathname === item.href;

                if (item.items) {
                  return (
                    <div 
                      key={item.name}
                      className="relative"
                      onMouseEnter={() => setActiveDropdown(item.name)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <button
                        className={cn(
                          "px-3 py-2 text-sm font-medium rounded-md transition-colors inline-flex items-center",
                          isActive
                            ? "bg-blue-50 text-blue-700"
                            : "text-gray-700 hover:bg-gray-50"
                        )}
                      >
                        <item.icon className="w-4 h-4 mr-2" />
                        {item.name}
                        <ChevronDown className="w-4 h-4 ml-1" />
                      </button>
                      <div className={cn(
                        "absolute top-full left-0 w-48 bg-white rounded-md shadow-lg py-1 z-50",
                        activeDropdown === item.name ? "block" : "hidden"
                      )}>
                        {item.items.map((subItem) => {
                          const isSubActive = location.pathname === subItem.href;
                          return (
                            <Link
                              key={subItem.name}
                              to={subItem.href}
                              className={cn(
                                "flex items-center px-4 py-2 text-sm",
                                isSubActive
                                  ? "bg-blue-50 text-blue-700"
                                  : "text-gray-700 hover:bg-gray-50"
                              )}
                            >
                              <subItem.icon className="w-4 h-4 mr-2" />
                              {subItem.name}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "px-3 py-2 text-sm font-medium rounded-md transition-colors inline-flex items-center",
                      isActive
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-700 hover:bg-gray-50"
                    )}
                  >
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.name}
                  </Link>
                );
              })}
              
              {/* User Navigation */}
              <div className="flex items-center space-x-2 border-l pl-4 ml-2">
                {userNavigation.map((item) => (
                  <form key={item.name} action={item.href} method={item.method}>
                    <button
                      type="submit"
                      className="px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50 transition-colors inline-flex items-center"
                    >
                      <item.icon className="w-4 h-4 mr-2" />
                      {item.name}
                    </button>
                  </form>
                ))}
              </div>
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-600" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          <div 
            className={cn(
              "md:hidden transition-all duration-300 ease-in-out",
              isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
            )}
          >
            <nav className="py-2 px-2 space-y-1 border-t bg-white">
              {navigation.map((item) => {
                const isActive = item.items 
                  ? item.items.some(subItem => subItem.href === location.pathname)
                  : location.pathname === item.href;

                if (item.items) {
                  return (
                    <div key={item.name}>
                      <div className={cn(
                        "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                        isActive
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-700 hover:bg-gray-50"
                      )}>
                        <div className="flex items-center">
                          <item.icon className="w-4 h-4 mr-2" />
                          {item.name}
                          <ChevronDown className="w-4 h-4 ml-auto" />
                        </div>
                      </div>
                      <div className="pl-4 space-y-1">
                        {item.items.map((subItem) => {
                          const isSubActive = location.pathname === subItem.href;
                          return (
                            <Link
                              key={subItem.name}
                              to={subItem.href}
                              className={cn(
                                "block px-3 py-2 text-sm font-medium rounded-md transition-colors",
                                isSubActive
                                  ? "bg-blue-50 text-blue-700"
                                  : "text-gray-700 hover:bg-gray-50"
                              )}
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              <div className="flex items-center">
                                <subItem.icon className="w-4 h-4 mr-2" />
                                {subItem.name}
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "block px-3 py-2 text-sm font-medium rounded-md transition-colors",
                      isActive
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-700 hover:bg-gray-50"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="flex items-center">
                      <item.icon className="w-4 h-4 mr-2" />
                      {item.name}
                    </div>
                  </Link>
                );
              })}
              
              {/* Mobile User Navigation */}
              <div className="border-t pt-2 mt-2">
                {userNavigation.map((item) => (
                  <form key={item.name} action={item.href} method={item.method}>
                    <button
                      type="submit"
                      className="w-full text-left px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <div className="flex items-center">
                        <item.icon className="w-4 h-4 mr-2" />
                        {item.name}
                      </div>
                    </button>
                  </form>
                ))}
              </div>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
} 