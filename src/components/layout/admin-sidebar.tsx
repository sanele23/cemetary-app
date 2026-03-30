"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  Cross,
  BookOpen,
  Users,
  BarChart3,
  MapPin,
  LogOut,
  ChevronLeft,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const sidebarLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/cemeteries", label: "Manage Cemeteries", icon: Building2 },
  { href: "/admin/graves", label: "Manage Graves", icon: Cross },
  { href: "/admin/burials", label: "Burial Records", icon: BookOpen },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/reports", label: "Reports", icon: BarChart3 },
];

interface AdminSidebarProps {
  onClose?: () => void;
}

export default function AdminSidebar({ onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 flex-col border-r bg-sidebar text-sidebar-foreground">
      {/* Brand */}
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
            <MapPin className="h-4 w-4 text-slate-600" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-slate-800">
              Cebisa Memorial
            </span>
            <span className="text-[10px] text-slate-600">Admin Portal</span>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white lg:hidden"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close menu</span>
          </button>
        )}
      </div>

      <Separator className="bg-white/10" />

      {/* User */}
      <div className="flex items-center gap-3 px-4 py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-sm font-medium text-slate-600">
          TM
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-slate-700">
            Samkelwa Qaka
          </span>
          <span className="text-xs text-slate-600">Super Admin</span>
        </div>
      </div>

      <Separator className="bg-white/10" />

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {sidebarLinks.map((link) => {
          const isActive =
            pathname === link.href ||
            (link.href !== "/admin" && pathname.startsWith(link.href));
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-accent text-white"
                  : "text-slate-400 hover:bg-sidebar-accent/50 hover:text-white",
              )}
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <Separator className="bg-white/10" />

      {/* Footer actions */}
      <div className="space-y-1 px-3 py-4">
        <Link
          href="/"
          onClick={onClose}
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 transition-colors hover:bg-sidebar-accent/50 hover:text-white"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Public Site
        </Link>
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 px-3 text-sm font-medium text-slate-400 hover:bg-sidebar-accent/50 hover:text-white"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </aside>
  );
}
