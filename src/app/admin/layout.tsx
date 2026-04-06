import { AdminSidebar } from "@/components/shared/admin-sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50/50 flex font-sans">
      <AdminSidebar />

      <main className="flex-1 ml-64 min-h-screen">{children}</main>
    </div>
  );
}
