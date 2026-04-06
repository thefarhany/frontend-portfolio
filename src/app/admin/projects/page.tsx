"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, FolderKanban, Loader2 } from "lucide-react";
import { projectService } from "@/services/project.service";
import { Project } from "@/types";
import { Button } from "@/components/ui/button";
import { AdminProjectCard } from "@/components/shared/admin-project-card";
import { toast } from "sonner";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const data = await projectService.getAll();
      setProjects(data.reverse());
    } catch (error) {
      toast.error("Gagal narik data project dari server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: string) => {
    if (
      !window.confirm(
        "Yakin nih mau ngapus project ini? Ga bisa dibalikin lho!",
      )
    )
      return;

    try {
      await projectService.delete(id);
      toast.success("Project berhasil dihapus bro!");
      setProjects(projects.filter((p) => p.id !== id));
    } catch (error) {
      toast.error("Waduh, gagal ngehapus project nih.");
    }
  };

  return (
    <div className="p-8 w-full animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
            Project Management
          </h1>
          <p className="text-slate-500 font-medium text-lg">
            Manage and showcase your best works.
          </p>
        </div>
        <Button
          className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl px-8 h-12 shadow-lg shadow-slate-200"
          asChild
        >
          <Link href="/admin/projects/create">
            <Plus className="w-5 h-5 mr-2" /> Add Project
          </Link>
        </Button>
      </div>

      {loading ? (
        <div className="flex flex-col justify-center items-center h-96 text-slate-400 gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-green-500" />
          <p className="font-medium">Narik data project dulu ya bro...</p>
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-24 bg-white/50 backdrop-blur-sm rounded-3xl border-2 border-dashed border-slate-200">
          <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <FolderKanban className="w-8 h-8 text-slate-400" />
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">
            Kosong melompong bro!
          </h2>
          <p className="text-slate-500 mb-8 max-w-xs mx-auto">
            Yuk bikin project pertama lu biar portofolio lu makin kece dilihat
            HR.
          </p>
          <Button
            className="bg-green-600 hover:bg-green-700 text-white rounded-xl px-8"
            asChild
          >
            <Link href="/admin/projects/create">
              <Plus className="w-4 h-4 mr-2" /> Buat Sekarang
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {projects.map((project) => (
            <AdminProjectCard
              key={project.id}
              project={project}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
