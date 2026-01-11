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
  ...props
}: FormInputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        {...props}
          aria-invalid={!!error}
        className={baseInputClass}
      />

      {error && (
        <span className="text-xs text-red-500">
          {error}
        </span>
      )}
    </div>
  );
}
