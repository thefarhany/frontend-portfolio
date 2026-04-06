"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { LayoutDashboard, FolderKanban, LogOut } from "lucide-react";
import { toast } from "sonner";

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("access_token");
    toast.success("Berhasil logout bro!");
    router.push("/login");
  };

  return (
    <aside className="w-64 bg-white border-r border-slate-200 min-h-screen flex flex-col fixed left-0 top-0">
      <div className="h-20 flex items-center px-8 border-b border-slate-100">
        <h2 className="text-2xl font-bold text-slate-900">Dashboard</h2>
      </div>

      <div className="flex-1 px-4 py-6 space-y-2">
        <Link
          href="/admin"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
            pathname === "/admin"
              ? "bg-green-600 text-white shadow-md shadow-green-600/20"
              : "text-slate-600 hover:bg-green-50 hover:text-green-700"
          }`}
        >
          <LayoutDashboard className="w-5 h-5" /> Overview
        </Link>
        <Link
          href="/admin/projects"
          className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
            pathname.includes("/admin/projects")
              ? "bg-green-600 text-white shadow-md shadow-green-600/20"
              : "text-slate-600 hover:bg-green-50 hover:text-green-700"
          }`}
        >
          <FolderKanban className="w-5 h-5" /> Projects
        </Link>
      </div>

      <div className="p-4 border-t border-slate-200">
        <div className="flex items-center gap-3 px-4 py-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold shrink-0">
            AM
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-slate-900 truncate">
              Alex Morgan
            </p>
            <p className="text-xs text-slate-500 truncate">admin@example.com</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl font-medium transition-colors"
        >
          <LogOut className="w-5 h-5" /> Logout
        </button>
      </div>
    </aside>
  );
}
