"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CheckboxProps {
  id?: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  className?: string;
  "aria-invalid"?: boolean;
}

export function Checkbox({
  id,
  checked,
  onCheckedChange,
  className,
  ...rest
}: CheckboxProps) {
  return (
    <button
      type="button"
      id={id}
      role="checkbox"
      aria-checked={checked}
      onClick={() => onCheckedChange(!checked)}
      className={cn(
        "flex h-5 w-5 shrink-0 items-center justify-center border border-input bg-bg/60 transition-colors clip-chamfer-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        checked && "border-magenta bg-magenta text-white",
        className
      )}
      {...rest}
    >
      {checked && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
    </button>
  );
}
