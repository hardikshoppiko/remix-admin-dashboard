import { 
  LayoutDashboard, 
  Package, 
  Tags, 
  ShoppingCart, 
  Users, 
  Settings, 
  Network,
  LogOut,
  User,
  ShoppingBag,
  FolderTree,
} from "lucide-react";

export const navigation = [
  {
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Sales",
    href: "/orders",
    icon: ShoppingCart,
    items: [
      {
        name: "Orders",
        href: "/orders",
        icon: ShoppingBag,
      },
      {
        name: "Products",
        href: "/products",
        icon: Package,
      },
      {
        name: "Categories",
        href: "/categories",
        icon: FolderTree,
      },
    ],
  },
  {
    name: "Customers",
    href: "/customers",
    icon: Users,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export const userNavigation = [
  { name: "Profile", href: "/profile", icon: User, method: "get" },
  { name: "Sign out", href: "/logout", icon: LogOut, method: "post" },
]; 