"use client";

import React from "react";
import { baseInputClass } from "./inputStyles";

type FormTextareaProps = {
  label: string;
  error?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export function FormTextarea({
  label,
  error,
  ...props
}: FormTextareaProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-600">
        {label}
      </label>

      <textarea
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
