import { GithubRepo } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import Link from "next/link";

export function RepoCard({ repo }: { repo: GithubRepo }) {
  return (
    <Card className="border-slate-200 shadow-sm hover:shadow-md transition-all hover:border-green-200 flex flex-col h-full rounded-2xl">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
          <Link
            href={repo.html_url}
            target="_blank"
            className="font-bold text-lg text-slate-900 hover:text-green-600 transition-colors"
          >
            {repo.name}
          </Link>
          <div className="flex items-center gap-1 text-sm text-slate-500 font-medium shrink-0">
            <Star className="h-4 w-4 fill-slate-300 text-slate-300" />{" "}
            {repo.stargazers_count}
          </div>
        </div>

        <p className="text-slate-600 text-sm flex-1 mb-6 line-clamp-3">
          {repo.description || "No description provided."}
        </p>

        <div className="flex items-center gap-2 mt-auto pt-4 border-t border-slate-100">
          <span className="w-3 h-3 rounded-full bg-green-500"></span>
          <span className="text-sm font-medium text-slate-700">
            {repo.language || "Unknown"}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
