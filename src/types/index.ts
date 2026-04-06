export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  cover_image_url: string;
  features: string[];
  tech_stack: string[];
  screenshots: string[];
  live_demo_url?: string | null;
  github_url?: string | null;
  project_duration: string;
  team_size: number;
  project_year: number;
  is_published: boolean;
}

export type ProjectCreate = Omit<Project, "id">;
export type ProjectUpdate = Partial<ProjectCreate>;

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export interface GithubRepo {
  id: number;
  name: string;
  html_url: string;
  description?: string | null;
  language?: string | null;
  stargazers_count: number;
  forks_count: number;
}

export interface GithubStats {
  followers: number;
  following: number;
  public_repos: number;
}
