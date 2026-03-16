"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, Phone, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  const pathname = usePathname();

  // Don't render footer on admin pages
  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <MapPin className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-foreground">Cebisa Memorial</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Helping families locate the burial sites of loved ones and
              assisting municipalities in managing cemetery records.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              <Link
                href="/"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Home
              </Link>
              <Link
                href="/cemeteries"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Cemeteries
              </Link>
              <Link
                href="/search"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Find a Grave
              </Link>
              <Link
                href="/admin"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Admin Portal
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Contact</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                0800 LOCATE (562 283)
              </span>
              <span className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                info@cebisamemorial.co.za
              </span>
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Legal</h4>
            <nav className="flex flex-col gap-2">
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                POPIA Compliance
              </Link>
            </nav>
          </div>
        </div>

        <Separator className="my-8" />

        <p className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Cebisa Memorial — Municipal Cemetery
          Management System. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
