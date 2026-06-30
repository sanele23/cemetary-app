"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Lock, LogOut, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/search", label: "DIRECTORY" },
  { href: "/cemeteries", label: "MAP" },
  { href: "/search", label: "MEMORIALS" },
  { href: "/cemeteries", label: "HISTORY" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

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

        <div className="relative" ref={menuRef}>
          <button
            type="button"
            aria-label="Profile menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#355c50] transition-colors hover:bg-[#f4f6f5]"
          >
            <UserRound className="h-5 w-5" strokeWidth={1.8} />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-[calc(100%+10px)] z-50 w-44 rounded-xl border border-[#e6ebe8] bg-white/95 p-2 backdrop-blur-sm">
              <Link
                href="/admin"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-[11px] font-medium tracking-[0.08em] text-[#1f2531] transition-colors hover:bg-[#f6f8f7]"
              >
                <Lock className="h-3.5 w-3.5" strokeWidth={1.8} />
                Admin Portal
              </Link>

              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="mt-1 flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-[11px] font-medium tracking-[0.08em] text-[#7f8893] transition-colors hover:bg-[#f6f8f7] hover:text-[#5f6873]"
              >
                <LogOut className="h-3.5 w-3.5" strokeWidth={1.8} />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
