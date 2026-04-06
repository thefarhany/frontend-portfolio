import { Project } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Calendar } from "lucide-react";
import Link from "next/link";

interface AdminProjectCardProps {
  project: Project;
  onDelete: (id: string) => void;
}

export function AdminProjectCard({ project, onDelete }: AdminProjectCardProps) {
  return (
    <Card className="group overflow-hidden border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 rounded-3xl flex flex-col h-full bg-white border-2 hover:border-green-100 relative">
      <div className="w-full h-52 overflow-hidden shrink-0 relative">
        <img
          src={project.cover_image_url}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <div className="absolute top-4 left-4">
          <div
            className={`px-3 py-1.5 rounded-xl text-[10px] uppercase tracking-widest font-black shadow-sm backdrop-blur-md border ${
              project.is_published
                ? "bg-green-500/90 text-white border-green-400"
                : "bg-amber-500/90 text-white border-amber-400"
            }`}
          >
            {project.is_published ? "Published" : "Draft"}
          </div>
        </div>
      </div>

      <CardContent className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
          <Calendar className="w-3 h-3" />
          <span>Added on 2026</span>
        </div>

        <h3 className="font-extrabold text-xl text-slate-900 mb-2 line-clamp-1 group-hover:text-green-600 transition-colors">
          {project.title}
        </h3>

        <p className="text-slate-500 text-sm mb-6 line-clamp-2 flex-1 leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          {project.tech_stack.slice(0, 3).map((tech, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-slate-50 text-slate-600 text-[11px] font-bold rounded-lg border border-slate-100 group-hover:bg-green-50 group-hover:text-green-600 group-hover:border-green-100 transition-colors"
            >
              {tech}
            </span>
          ))}
          {project.tech_stack.length > 3 && (
            <span className="px-3 py-1 bg-slate-50 text-slate-400 text-[11px] font-bold rounded-lg">
              +{project.tech_stack.length - 3}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 mt-auto pt-4 border-t border-slate-50">
          <Button
            variant="outline"
            className="flex-1 bg-white border-slate-200 hover:bg-slate-900 hover:text-white hover:border-slate-900 text-slate-700 rounded-xl font-bold transition-all"
            asChild
          >
            <Link href={`/admin/projects/${project.id}/edit`}>
              <Edit className="w-4 h-4 mr-2" /> Edit
            </Link>
          </Button>

          <Button
            variant="ghost"
            className="bg-red-50 text-red-500 hover:bg-red-500 hover:text-white border-none rounded-xl w-11 px-0 transition-all"
            onClick={() => onDelete(project.id)}
          >
            <Trash2 className="w-5 h-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
