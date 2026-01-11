"use client";

import React from "react";
import { baseInputClass } from "./inputStyles";

type Option = {
  label: string;
  value: string;
};

type FormDropdownProps = {
  label: string;
  options: Option[];
  placeholder?: string;
  error?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export function FormDropdown({
  label,
  options,
  placeholder = "Select option",
  error,
  ...props
}: FormDropdownProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-600">
        {label}
      </label>

      <select
        {...props}
        className={baseInputClass}
      >
        <option value="" disabled>
          {placeholder}
        </option>

        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {error && (
        <span className="text-xs text-red-500">
          {error}
        </span>
      )}
    </div>
  );
}
