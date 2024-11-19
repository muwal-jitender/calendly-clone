"use client";

import { ComponentProps } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export const NavLink = ({
  className,
  ...props
}: ComponentProps<typeof Link>) => {
  const path = usePathname();
  const isActive = path === props.href;
  return (
    <Link
      {...props}
      className={cn(
        "transition-colors",
        isActive
          ? "text-foreground"
          : "text-muted-foreground hover:text-foreground",
        className
      )}
    />
  );
};
