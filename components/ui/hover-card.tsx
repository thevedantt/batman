import * as React from "react";

import { cn } from "@/lib/utils";

function HoverCard({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="hover-card"
      className={cn("group relative inline-flex", className)}
      {...props}
    />
  );
}

function HoverCardContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="hover-card-content"
      className={cn(
        "pointer-events-none absolute left-0 top-full z-10 mt-2 w-64 rounded-2xl border border-white/10 bg-black/90 p-4 text-xs text-zinc-300 opacity-0 shadow-[0_20px_40px_rgba(0,0,0,0.6)] transition group-hover:opacity-100",
        className
      )}
      {...props}
    />
  );
}

export { HoverCard, HoverCardContent };
