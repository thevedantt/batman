import * as React from "react";

import { cn } from "@/lib/utils";

function Badge({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="badge"
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/60 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-zinc-300",
        className
      )}
      {...props}
    />
  );
}

export { Badge };
