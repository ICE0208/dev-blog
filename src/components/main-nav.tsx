"use client";

import Link from "next/link";
import { Icons } from "./icons";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function MainNav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      <Link
        href="/"
        className="mr-6 flex items-center space-x-2"
      >
        <Icons.logo className="h-6 w-6" />
        <span className="text-lg font-bold">{siteConfig.name}</span>
      </Link>
      <Link
        href="/posts"
        className={cn(
          "text-md transition-colors hover:text-primary hidden sm:inline-block",
          pathname === "/posts"
            ? "text-foreground font-bold"
            : "text-foreground/60 font-medium"
        )}
      >
        Posts
      </Link>
      <Link
        href="/about"
        className={cn(
          "text-md transition-colors hover:text-primary hidden sm:inline-block",
          pathname === "/about"
            ? "text-foreground font-bold"
            : "text-foreground/60 font-medium"
        )}
      >
        About
      </Link>
    </nav>
  );
}
