import { forwardRef, type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, className = "", ...rest }, ref) => {
    const inputId = id ?? rest.name;

    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={inputId} className="text-sm font-medium text-slate-700">
          {label}
        </label>
        <input
          id={inputId}
          ref={ref}
          className={`rounded-lg border px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-colors
            placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500/30
            ${error ? "border-red-400 focus:border-red-500" : "border-slate-200 focus:border-blue-500"}
            ${className}`}
          {...rest}
        />
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
