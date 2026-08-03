import { forwardRef, type SelectHTMLAttributes } from "react";

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOption[];
  error?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, id, className = "", ...rest }, ref) => {
    const selectId = id ?? rest.name;

    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={selectId} className="text-sm font-medium text-slate-700">
          {label}
        </label>
        <select
          id={selectId}
          ref={ref}
          className={`rounded-lg border bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-colors
            focus:ring-2 focus:ring-blue-500/30
            ${error ? "border-red-400 focus:border-red-500" : "border-slate-200 focus:border-blue-500"}
            ${className}`}
          {...rest}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
