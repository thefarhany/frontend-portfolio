import { Project } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col h-full cursor-pointer"
    >
      <Card className="overflow-hidden border-slate-100 shadow-sm group-hover:shadow-lg transition-all duration-300 rounded-2xl flex flex-col h-full group-hover:border-neutral-200">
        <div className="w-full h-56 overflow-hidden shrink-0">
          <img
            src={project.cover_image_url}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>

        <CardContent className="p-4 flex flex-col flex-1">
          <h3 className="font-bold text-xl text-slate-900 mb-2 ">
            {project.title}
          </h3>
          <p className="text-slate-600 text-sm mb-6 line-clamp-2">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mt-auto">
            {project.tech_stack.slice(0, 3).map((tech, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-neutral-50 text-neutral-700 text-xs font-medium rounded-full"
              >
                {tech}
              </span>
            ))}
            {project.tech_stack.length > 3 && (
              <span className="px-3 py-1 bg-slate-50 text-slate-600 text-xs font-medium rounded-full">
                +{project.tech_stack.length - 3}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
