import AdminSidebar from "@/components/layout/admin-sidebar";

export const metadata = {
  title: "Admin Portal — Cebisa Memorial",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />
      <div className="flex flex-1 flex-col overflow-auto">
        {/* Top bar */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b bg-white px-6">
          <h2 className="text-lg font-semibold">Admin Portal</h2>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">
              Welcome, Samkelwa
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-medium text-white">
              SQ
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto bg-muted/30 p-6">{children}</main>
      </div>
    </div>
  );
}
