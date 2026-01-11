"use client";

import React from "react";
import { baseInputClass } from "./inputStyles";

type FormDateTimeProps = {
  label: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export function FormDateTime({
  label,
  error,
  ...props
}: FormDateTimeProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-600">
        {label}
      </label>

      <input
        type="datetime-local"
        {...props}
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
