import { cn } from "../../lib/utils";

const variants = {
  default: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
  outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500",
  ghost: "text-gray-700 hover:bg-gray-100 focus:ring-blue-500",
  link: "text-blue-600 hover:text-blue-700 underline-offset-4 hover:underline"
};

const sizes = {
  default: "px-4 py-2 text-sm",
  sm: "px-3 py-1.5 text-xs",
  lg: "px-6 py-3 text-base",
  icon: "p-2"
};

export function Button({
  className,
  variant = "default",
  size = "default",
  type = "button",
  children,
  ...props
}) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
} 