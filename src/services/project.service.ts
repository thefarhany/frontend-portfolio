import { api } from "@/lib/api";
import { Project, ProjectCreate, ProjectUpdate } from "@/types";

export const projectService = {
  getAll: async () => {
    const response = await api.get<Project[]>("/projects/");
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get<Project>(`/projects/${id}`);
    return response.data;
  },

  getBySlug: async (slug: string) => {
    const response = await api.get<Project>(`/projects/slug/${slug}`);
    return response.data;
  },

  create: async (data: ProjectCreate) => {
    const response = await api.post<Project>("/projects/", data);
    return response.data;
  },

  update: async (id: string, data: ProjectUpdate) => {
    const response = await api.patch<Project>(`/projects/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/projects/${id}`);
    return response.data;
  },
};
