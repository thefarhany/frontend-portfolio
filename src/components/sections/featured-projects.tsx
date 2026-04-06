"use client";

import { useEffect, useState } from "react";
import { projectService } from "@/services/project.service";
import { Project } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ProjectCard } from "@/components/shared/project-card";
import Link from "next/link";

export function FeaturedProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await projectService.getAll();

        const publishedProjects = data.filter((p) => p.is_published);

        const latestProjects = publishedProjects.reverse().slice(0, 3);

        setProjects(latestProjects);
      } catch (error) {
        console.error("Gagal narik data project bro:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section
      id="projects"
      className="container mx-auto px-4 md:px-20 py-10 lg:py-20"
    >
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
            Featured Projects
          </h2>
          <p className="text-slate-600">Some of my recent work</p>
        </div>
        <Button
          variant="outline"
          className="hidden md:flex text-green-600 border-green-200 hover:bg-green-50 hover:text-green-700"
          asChild
        >
          <Link href="/projects" className="flex items-center">
            View All <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64 text-slate-500">
          Loading Data...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}

      <Button
        variant="outline"
        className="w-full mt-8 md:hidden text-green-600 border-green-200"
      >
        View All <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </section>
  );
}
