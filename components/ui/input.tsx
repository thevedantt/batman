import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-10 w-full min-w-0 rounded-lg border px-3 py-2 text-base outline-none transition-[color,box-shadow,border-color] selection:bg-primary/25 file:inline-flex file:h-8 file:border-0 file:bg-transparent file:text-sm file:font-medium md:text-sm",
        className
      )}
      {...props}
    />
  );
}

export { Input };
