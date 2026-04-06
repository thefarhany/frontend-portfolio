"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { projectService } from "@/services/project.service";
import { Project } from "@/types";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, CheckCircle2, ExternalLink, GitBranch } from "lucide-react";
import { useTitle } from "@/hooks/use-title";

export default function ProjectDetailPage() {
  const params = useParams();
  const projectSlug = params.slug as string;

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useTitle(project ? project.title : "");

  useEffect(() => {
    const fetchProjectDetail = async () => {
      try {
        const data = await projectService.getBySlug(projectSlug);
        setProject(data);
      } catch (error) {
        console.error("Gagal narik detail project bro:", error);
      } finally {
        setLoading(false);
      }
    };

    if (projectSlug) fetchProjectDetail();
  }, [projectSlug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-medium text-slate-500">
        Loading Data...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center font-medium text-red-500">
        No Project Found!
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-8 py-10 min-h-screen">
      <div className="w-full h-75 md:h-112.5 lg:h-125 rounded-3xl overflow-hidden mb-12 shadow-sm border border-slate-100">
        <img
          src={project.cover_image_url}
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              {project.title}
            </h1>
            <p className="text-slate-600 text-lg leading-relaxed">
              {project.description}
            </p>
          </div>

          {project.features && project.features.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Key Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-slate-600">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {project.screenshots && project.screenshots.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Screenshots
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.screenshots.map((img, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl overflow-hidden border border-slate-100 shadow-sm"
                  >
                    <img
                      src={img}
                      alt={`Screenshot ${idx + 1}`}
                      className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-1 space-y-6">
          <Card className="border-slate-100 shadow-sm rounded-2xl">
            <CardContent className="p-6">
              <h3 className="font-bold text-lg text-slate-900 mb-4">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tech_stack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 bg-green-50 text-green-700 text-xs font-semibold rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col gap-3">
            {project.live_demo_url ? (
              <Button
                className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-base rounded-xl shadow-sm"
                asChild
              >
                <Link href={project.live_demo_url} target="_blank">
                  <ExternalLink className="w-5 h-5 mr-2" /> Live Demo
                </Link>
              </Button>
            ) : (
              <Button disabled className="w-full py-6 text-base rounded-xl">
                No Live Demo
              </Button>
            )}

            {project.github_url ? (
              <Button
                variant="outline"
                className="w-full border-green-600 text-green-700 hover:bg-green-50 py-6 text-base rounded-xl"
                asChild
              >
                <Link href={project.github_url} target="_blank">
                  <GitBranch className="w-5 h-5 mr-2" /> View Code
                </Link>
              </Button>
            ) : (
              <Button
                disabled
                variant="outline"
                className="w-full py-6 text-base rounded-xl"
              >
                Private Repo
              </Button>
            )}
          </div>

          <Card className="bg-green-50/50 border-green-100 shadow-sm rounded-2xl">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-bold text-lg text-slate-900 mb-2">
                Project Info
              </h3>

              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500 font-medium">Duration</span>
                <span className="text-slate-900 font-semibold">
                  {project.project_duration}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm pt-2 border-t border-green-100">
                <span className="text-slate-500 font-medium">Team Size</span>
                <span className="text-slate-900 font-semibold">
                  {project.team_size}{" "}
                  {project.team_size > 1 ? "developers" : "developer"}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm pt-2 border-t border-green-100">
                <span className="text-slate-500 font-medium">Year</span>
                <span className="text-slate-900 font-semibold">
                  {project.project_year}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
