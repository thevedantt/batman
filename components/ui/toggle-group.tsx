import * as React from "react";

import { cn } from "@/lib/utils";

type ToggleOption = {
  value: string;
  label: string;
};

type ToggleGroupProps = {
  value: string;
  onValueChange: (value: string) => void;
  options: ToggleOption[];
  className?: string;
};

function ToggleGroup({ value, onValueChange, options, className }: ToggleGroupProps) {
  return (
    <div
      data-slot="toggle-group"
      className={cn("flex flex-wrap items-center gap-1.5", className)}
      role="group"
      aria-label="Project filters"
    >
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            data-state={active ? "on" : "off"}
            className={cn(
              "rounded-full border border-[#c1121f]/20 bg-black/70 px-3 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-zinc-400 transition",
              "hover:border-[#c1121f]/60 hover:text-white hover:shadow-[0_0_16px_rgba(193,18,31,0.25)]",
              "data-[state=on]:border-[#c1121f] data-[state=on]:text-white data-[state=on]:shadow-[0_0_20px_rgba(193,18,31,0.35)]"
            )}
            onClick={() => onValueChange(option.value)}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export { ToggleGroup };
