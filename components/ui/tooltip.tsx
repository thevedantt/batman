import * as React from "react";

import { cn } from "@/lib/utils";

type TooltipProps = React.ComponentProps<"span"> & {
  label: string;
};

function Tooltip({ label, className, children, ...props }: TooltipProps) {
  return (
    <span
      data-slot="tooltip"
      className={cn("relative inline-flex", className)}
      title={label}
      {...props}
    >
      {children}
    </span>
  );
}

export { Tooltip };
