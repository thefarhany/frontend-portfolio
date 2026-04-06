"use client";

import { useEffect, useState } from "react";
import { projectService } from "@/services/project.service";
import { Project } from "@/types";
import { ProjectCard } from "@/components/shared/project-card";
import { Button } from "@/components/ui/button";
import { useTitle } from "@/hooks/use-title";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All Projects");

  useTitle("My Projects");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await projectService.getAll();

        const publishedProjects = data.filter((p) => p.is_published);

        setProjects(publishedProjects.reverse());
      } catch (error) {
        console.error("Gagal narik data project bro:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === "All Projects") return true;

    const techStr = project.tech_stack.join(" ").toLowerCase();

    if (activeFilter === "Frontend") {
      return (
        techStr.includes("react") ||
        techStr.includes("vue") ||
        techStr.includes("next") ||
        techStr.includes("tailwind")
      );
    }
    if (activeFilter === "Full Stack") {
      return (
        techStr.includes("node") ||
        techStr.includes("postgres") ||
        techStr.includes("fastapi") ||
        techStr.includes("express") ||
        techStr.includes("django")
      );
    }
    return true;
  });

  const filters = ["All Projects", "Frontend", "Full Stack"];

  return (
    <div className="container mx-auto px-4 md:px-20 py-10 lg:py-20 min-h-screen">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
          My Projects
        </h1>
        <p className="text-slate-600 text-lg">
          A collection of projects I've worked on, showcasing my skills and
          passion for web development.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-16">
        {filters.map((filter) => (
          <Button
            key={filter}
            variant={activeFilter === filter ? "default" : "outline"}
            onClick={() => setActiveFilter(filter)}
            className={`rounded-full px-8 py-6 text-base font-medium transition-all ${
              activeFilter === filter
                ? "bg-black hover:bg-black/80 text-white shadow-md"
                : "border-slate-200 text-slate-600 hover:text-neutral-600 hover:border-neutral-200 bg-white"
            }`}
          >
            {filter}
          </Button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64 text-slate-500 font-medium">
          Loading Data...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}

          {filteredProjects.length === 0 && (
            <div className="col-span-full text-center text-slate-500 py-10">
              No Available Projects On This Category.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
