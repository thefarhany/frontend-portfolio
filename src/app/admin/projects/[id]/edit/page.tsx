"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { projectService } from "@/services/project.service";
import { Project } from "@/types";
import { ProjectForm } from "@/components/forms/project-form";
import { toast } from "sonner";

export default function EditProjectPage() {
  const params = useParams();
  const projectId = params.id as string;

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await projectService.getById(projectId);
        setProject(data);
      } catch (error) {
        console.error("Gagal narik data project bro:", error);
        toast.error("Waduh, projectnya nggak ketemu nih.");
      } finally {
        setLoading(false);
      }
    };

    if (projectId) fetchProject();
  }, [projectId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500">
        <Loader2 className="w-8 h-8 animate-spin mr-2" /> Narik data project
        bro...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-slate-500">
        <p className="text-xl font-bold text-slate-900 mb-2">
          Project Not Found
        </p>
        <p className="mb-4">
          Project yang mau lu edit kayaknya udah ilang atau dihapus deh.
        </p>
        <Link href="/admin/projects" className="text-green-600 hover:underline">
          Balik ke List Project
        </Link>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <Link
        href="/admin/projects"
        className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-green-600 mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Project List
      </Link>

      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Edit Project</h1>
        <p className="text-slate-600">
          Update portofolio lu biar selalu fresh.
        </p>
      </div>

      <ProjectForm initialData={project} isEdit={true} />
    </div>
  );
}
