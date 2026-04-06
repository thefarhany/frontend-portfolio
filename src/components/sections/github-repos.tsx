"use client";

import { useEffect, useState } from "react";
import { githubService } from "@/services/github.service";
import { GithubRepo } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, GitFork, BookOpen } from "lucide-react";
import Link from "next/link";
import { RepoCard } from "@/components/shared/repo-card";

export function GithubRepos() {
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const data = await githubService.getRepos();
        setRepos(data.slice(0, 6));
      } catch (error) {
        console.error("Gagal narik data Github bro:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  return (
    <section
      id="repositories"
      className="container mx-auto px-4 md:px-20 py-10 lg:py-20 bg-slate-50/50"
    >
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
            GitHub Repositories
          </h2>
          <p className="text-slate-600">
            Open source contributions and personal projects
          </p>
        </div>
        <Button
          variant="outline"
          className="hidden md:flex text-green-600 border-green-200 hover:bg-green-50 hover:text-green-700"
          asChild
        >
          <Link href="/repositories" className="flex items-center">
            View All <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40 text-slate-500">
          Loading repos bro...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {repos.map((repo) => (
            <RepoCard key={repo.id} repo={repo} />
          ))}
        </div>
      )}
    </section>
  );
}
