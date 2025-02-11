"use client";
import { useState } from "react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import Link, { LinkProps } from "next/link";
import { Icons } from "./icons";
import { siteConfig } from "@/config/site";
import { useRouter } from "next/navigation";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet
      open={open}
      onOpenChange={setOpen}
    >
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="w-10 px-0 sm:hidden"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Theme</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetTitle>
          <MobileLink
            href="/"
            className="flex items-center"
            onOpenChange={setOpen}
          >
            <Icons.logo className="mr-2 size-4" />
            <span className="font-bold">{siteConfig.name}</span>
          </MobileLink>
        </SheetTitle>

        <div className="flex flex-col gap-3 mt-3">
          <MobileLink
            onOpenChange={setOpen}
            href="/posts"
          >
            Posts
          </MobileLink>
          <MobileLink
            onOpenChange={setOpen}
            href="/about"
          >
            About
          </MobileLink>
          <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}

interface MobileLinkProps extends LinkProps {
  children: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

function MobileLink({
  href,
  onOpenChange,
  children,
  className,
  ...props
}: MobileLinkProps) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      className={className}
      {...props}
    >
      {children}
    </Link>
  );
}
