"use client";

import { useEffect, useState } from "react";
import { githubService } from "@/services/github.service";
import { GithubRepo, GithubStats } from "@/types";
import { RepoCard } from "@/components/shared/repo-card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useTitle } from "@/hooks/use-title";
import { FaGithub } from "react-icons/fa";

export default function RepositoriesPage() {
  useTitle("GitHub Repositories");

  const [repos, setRepos] = useState<GithubRepo[]>([]);

  const [stats, setStats] = useState<GithubStats>({
    followers: 0,
    following: 0,
    public_repos: 0,
  });

  const [loading, setLoading] = useState(true);
  const [displayCount, setDisplayCount] = useState(6);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [reposData, statsData] = await Promise.all([
          githubService.getRepos(),
          githubService.getStats(),
        ]);

        setRepos(reposData);
        setStats(statsData);
      } catch (error) {
        console.error("Gagal narik data Github bro:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalStars = repos.reduce(
    (acc, curr) => acc + curr.stargazers_count,
    0,
  );

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + 6);
  };

  const visibleRepos = repos.slice(0, displayCount);

  return (
    <div className="container mx-auto px-4 md:px-8 py-20 min-h-screen">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-neutral-50 mb-6">
          <FaGithub className="w-8 h-8 text-black" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
          GitHub Repositories
        </h1>
        <p className="text-slate-600 text-lg">
          Open source projects and contributions. Check out my code and feel
          free to contribute!
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto mb-16">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-center flex flex-col justify-center h-full">
          <h3 className="text-3xl md:text-4xl font-bold text-black mb-2">
            {loading ? "..." : stats.public_repos}
          </h3>
          <p className="text-slate-500 font-medium">Repositories</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-center flex flex-col justify-center h-full">
          <h3 className="text-3xl md:text-4xl font-bold text-black mb-2">
            {loading ? "..." : totalStars}
          </h3>
          <p className="text-slate-500 font-medium">Total Stars</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-center flex flex-col justify-center h-full">
          <h3 className="text-3xl md:text-4xl font-bold text-black mb-2">
            {loading ? "..." : stats.following}
          </h3>
          <p className="text-slate-500 font-medium">Following</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-center flex flex-col justify-center h-full">
          <h3 className="text-3xl md:text-4xl font-bold text-black mb-2">
            {loading ? "..." : stats.followers}
          </h3>
          <p className="text-slate-500 font-medium">Followers</p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64 text-slate-500 font-medium">
          <Loader2 className="w-6 h-6 animate-spin mr-2" /> Loading Data...
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {visibleRepos.map((repo) => (
              <RepoCard key={repo.id} repo={repo} />
            ))}
          </div>

          {displayCount < repos.length && (
            <div className="flex justify-center mb-20">
              <Button
                onClick={handleLoadMore}
                variant="outline"
                className="border-neutral-200 text-black hover:bg-neutral-50 hover:text-neutral-700 rounded-full px-8 py-6 font-medium"
              >
                Load More Repositories
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
