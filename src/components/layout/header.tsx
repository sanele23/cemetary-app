"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserRound } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/search", label: "DIRECTORY" },
  { href: "/cemeteries", label: "MAP" },
  { href: "/search", label: "MEMORIALS" },
  { href: "/cemeteries", label: "HISTORY" },
  { href: "/admin", label: "ADMIN PORTAL" },
];

export default function Header() {
  const pathname = usePathname();

  // Don't render public header on admin pages
  if (pathname.startsWith("/admin")) return null;

  return (
    <header className="w-full bg-white">
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link href="/" className="text-[2rem] font-bold leading-none text-[#2f5348]">
          Cebisa Memorial
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <Link
              key={`${link.href}-${link.label}`}
              href={link.href}
              className={cn(
                "text-xs font-semibold tracking-[0.22em] text-[#1e2430]/85 transition-opacity hover:opacity-65",
                pathname === link.href && "opacity-100",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/admin"
          aria-label="Profile"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#355c50] transition-colors hover:bg-[#f4f6f5]"
        >
          <UserRound className="h-5 w-5" strokeWidth={1.8} />
        </Link>
      </div>
    </header>
  );
}
