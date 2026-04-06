"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FolderGit2,
  Eye,
  TrendingUp,
  Users,
  Plus,
  ArrowRight,
} from "lucide-react";
import { projectService } from "@/services/project.service";
import { githubService } from "@/services/github.service";
import { Project } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AdminDashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [githubStars, setGithubStars] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsData, reposData] = await Promise.all([
          projectService.getAll(),
          githubService.getRepos(),
        ]);

        setProjects(projectsData);

        const totalStars = reposData.reduce(
          (acc, curr) => acc + curr.stargazers_count,
          0,
        );
        setGithubStars(totalStars);
      } catch (error) {
        console.error("Gagal load data dashboard bro:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-8 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
            Dashboard Overview
          </h1>
          <p className="text-slate-500 font-medium">
            Welcome back! Here's what's happening with your portfolio today.
          </p>
        </div>
        <Button
          className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl shadow-sm"
          asChild
        >
          <Link href="/admin/projects/create">
            <Plus className="w-4 h-4 mr-2" /> Add New Project
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <Card className="border-slate-100 bg-white/70 backdrop-blur-sm shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 rounded-2xl">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4 border border-blue-100/50">
              <FolderGit2 className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-1">
              {loading ? "..." : projects.length}
            </h3>
            <p className="text-sm font-medium text-slate-500 mb-2">
              Total Projects
            </p>
            <div className="flex items-center text-xs font-semibold text-green-600 bg-green-50 w-fit px-2 py-1 rounded-md">
              <TrendingUp className="w-3 h-3 mr-1" /> +2 this month
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-100 bg-white/70 backdrop-blur-sm shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 rounded-2xl">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-4 border border-emerald-100/50">
              <Eye className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-1">8,456</h3>
            <p className="text-sm font-medium text-slate-500 mb-2">
              Total Views
            </p>
            <div className="flex items-center text-xs font-semibold text-green-600 bg-green-50 w-fit px-2 py-1 rounded-md">
              <TrendingUp className="w-3 h-3 mr-1" /> +12% this week
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-100 bg-white/70 backdrop-blur-sm shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 rounded-2xl">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mb-4 border border-purple-100/50">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-1">
              {loading ? "..." : githubStars}
            </h3>
            <p className="text-sm font-medium text-slate-500 mb-2">
              GitHub Stars
            </p>
            <div className="flex items-center text-xs font-semibold text-green-600 bg-green-50 w-fit px-2 py-1 rounded-md">
              <TrendingUp className="w-3 h-3 mr-1" /> +45 this month
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-100 bg-white/70 backdrop-blur-sm shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 rounded-2xl">
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mb-4 border border-orange-100/50">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-1">567</h3>
            <p className="text-sm font-medium text-slate-500 mb-2">Followers</p>
            <div className="flex items-center text-xs font-semibold text-green-600 bg-green-50 w-fit px-2 py-1 rounded-md">
              <TrendingUp className="w-3 h-3 mr-1" /> +23 this week
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-slate-100 bg-white/70 backdrop-blur-sm shadow-sm rounded-2xl mb-10 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Recent Projects</h2>
          <Link
            href="/admin/projects"
            className="text-sm font-medium text-green-600 hover:text-green-700 flex items-center"
          >
            View All <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-xs uppercase tracking-wider text-slate-400 font-bold border-b border-slate-100">
                <th className="px-6 py-4">Project Name</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Views</th>
                <th className="px-6 py-4">Last Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-12 text-center text-slate-500 font-medium"
                  >
                    Narik data dulu bro...
                  </td>
                </tr>
              ) : (
                projects.slice(0, 3).map((project, i) => (
                  <tr
                    key={project.id}
                    className="hover:bg-slate-50/80 transition-colors group"
                  >
                    <td className="px-6 py-4 font-semibold text-slate-800 group-hover:text-green-600 transition-colors">
                      {project.title}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                          project.is_published
                            ? "bg-green-100 text-green-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {project.is_published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500 font-medium">
                      {1234 - i * 100}
                    </td>
                    <td className="px-6 py-4 text-slate-500 font-medium">
                      2026-04-01
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-linear-to-br from-green-50 to-emerald-50/50 rounded-2xl p-8 border border-green-100/50 relative overflow-hidden group">
          <div className="relative z-10">
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Ready to add a new project?
            </h3>
            <p className="text-slate-600 mb-8 max-w-sm">
              Share your latest work with the world and keep your portfolio up
              to date.
            </p>
            <Button
              className="bg-green-600 hover:bg-green-700 text-white rounded-xl px-6 shadow-sm shadow-green-600/20"
              asChild
            >
              <Link href="/admin/projects/create">Add Project</Link>
            </Button>
          </div>
          <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-green-200/40 rounded-full blur-3xl group-hover:bg-green-300/40 transition-colors"></div>
        </div>

        <div className="bg-linear-to-br from-blue-50 to-indigo-50/50 rounded-2xl p-8 border border-blue-100/50 relative overflow-hidden group">
          <div className="relative z-10">
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Portfolio Performance
            </h3>
            <p className="text-slate-600 mb-8 max-w-sm">
              Your portfolio has been viewed 8,456 times this month. Keep up the
              great work!
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 shadow-sm shadow-blue-600/20">
              View Analytics
            </Button>
          </div>
          <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-blue-200/40 rounded-full blur-3xl group-hover:bg-blue-300/40 transition-colors"></div>
        </div>
      </div>
    </div>
  );
}
