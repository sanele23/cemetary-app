import AdminShell from "@/components/layout/admin-shell";

export const metadata = {
  title: "Admin Portal: Cebisa Memorial",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminShell>{children}</AdminShell>;
}
