import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ProjectForm } from "@/components/forms/project-form";

export default function CreateProjectPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <Link
        href="/admin/projects"
        className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-green-600 mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Project List
      </Link>

      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Create New Project
        </h1>
        <p className="text-slate-600">
          Tambah portofolio terbaru lu biar makin gacor.
        </p>
      </div>

      <ProjectForm isEdit={false} />
    </div>
  );
}
