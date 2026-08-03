import { Loader2 } from "lucide-react";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses: Record<NonNullable<SpinnerProps["size"]>, string> = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-10 w-10",
};

export default function Spinner({ size = "md", className = "" }: SpinnerProps) {
  return (
    <Loader2
      className={`animate-spin text-blue-600 ${sizeClasses[size]} ${className}`}
      aria-label="Loading"
    />
  );
}
