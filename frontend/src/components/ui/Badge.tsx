import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "blue" | "green" | "slate" | "red";
}

const variantClasses: Record<NonNullable<BadgeProps["variant"]>, string> = {
  blue: "bg-blue-50 text-blue-600",
  green: "bg-emerald-50 text-emerald-600",
  slate: "bg-slate-100 text-slate-600",
  red: "bg-red-50 text-red-600",
};

export default function Badge({ children, variant = "slate" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${variantClasses[variant]}`}
    >
      {children}
    </span>
  );
}
