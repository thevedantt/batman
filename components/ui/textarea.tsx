import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-28 w-full rounded-lg border px-3 py-2 text-base outline-none transition-[color,box-shadow,border-color] md:text-sm",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
