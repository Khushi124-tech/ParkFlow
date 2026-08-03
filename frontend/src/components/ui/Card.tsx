import type { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function Card({ children, className = "", ...rest }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-slate-100 bg-white p-6 shadow-sm ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
