import { api } from "@/lib/api";
import { GithubRepo, GithubStats } from "@/types";

export const githubService = {
  getRepos: async () => {
    const response = await api.get<GithubRepo[]>("/repositories/");
    return response.data;
  },

  getStats: async (): Promise<GithubStats> => {
    const response = await api.get("/repositories/stats");
    return response.data;
  },
};
