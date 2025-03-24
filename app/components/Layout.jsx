import { Link, useLocation, useNavigation } from "@remix-run/react";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings,
  Menu,
  X,
  Network,
  LogOut
} from "lucide-react";
import { useState } from "react";

export default function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const navigation = useNavigation();
  const isNavigating = navigation.state === "loading";

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/" },
    { icon: Network, label: "Categories", path: "/categories" },
    { icon: Package, label: "Products", path: "/products" },
    { icon: ShoppingCart, label: "Orders", path: "/orders" },
    { icon: Users, label: "Customers", path: "/customers" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 transform transition-transform duration-200 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            <h1 className="text-xl font-bold text-white">OpenCart Admin</h1>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 md:hidden"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <nav className="flex-1 px-2 py-4 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-colors duration-200 ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-gray-800">
            <form action="/logout" method="post">
              <button
                type="submit"
                className="flex items-center w-full px-4 py-2.5 text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white rounded-md transition-colors duration-200"
              >
                <LogOut className="mr-3 h-5 w-5" />
                Logout
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            >
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="text-xl font-bold text-gray-900">OpenCart Admin</h1>
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-gray-50">
          {isNavigating && (
            <div className="fixed top-0 left-0 right-0 h-1 bg-blue-600 animate-pulse " />
          )}
          {children}
        </main>
      </div>
    </div>
  );
} 