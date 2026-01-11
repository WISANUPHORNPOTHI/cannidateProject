"use client";

import React from "react";
import { baseInputClass } from "./inputStyles";

type FormInputProps = {
  label: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export function FormInput({
  label,
  error,
  className,
  ...props
}: FormInputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        {...props}
        className={`
          h-11 rounded-md border px-3 text-sm
          text-gray-800 bg-white

          transition-all
          duration-300
          ease-out

          focus:outline-none

          ${error
            ? `
              border-red-400
              ring-2 ring-red-200
            `
            : `
              border-gray-300
              focus:border-blue-500
              focus:ring-2 focus:ring-blue-300
              focus:-translate-y-[2px]
              focus:shadow-lg
            `}

          ${className ?? ""} 
        `}
      />

      {error && (
        <span className="text-xs text-red-500">
          {error}
        </span>
      )}
    </div>
  );
}
