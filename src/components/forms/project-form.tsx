"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Save, Image as ImageIcon, X, UploadCloud } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { projectService } from "@/services/project.service";
import { uploadService } from "@/services/upload.service";
import { Project, ProjectCreate } from "@/types";

interface ProjectFormProps {
  initialData?: Project;
  isEdit?: boolean;
}

export function ProjectForm({ initialData, isEdit = false }: ProjectFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [screenshotFiles, setScreenshotFiles] = useState<File[]>([]);

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    description: initialData?.description || "",
    tech_stack: initialData?.tech_stack.join(", ") || "",
    features: initialData?.features.join(" | ") || "",
    live_demo_url: initialData?.live_demo_url || "",
    github_url: initialData?.github_url || "",
    project_duration: initialData?.project_duration || "",
    team_size: initialData?.team_size || 1,
    project_year: initialData?.project_year || new Date().getFullYear(),
    is_published: initialData?.is_published || false,
    cover_image_url: initialData?.cover_image_url || "",
    screenshots: initialData?.screenshots || [],
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, is_published: e.target.checked }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let finalCoverUrl = formData.cover_image_url;
      let finalScreenshots = [...formData.screenshots];

      if (coverFile) {
        toast.info("Lagi ngupload cover image...");
        const uploadRes = await uploadService.uploadSingleImage(coverFile);
        finalCoverUrl = uploadRes.image_url;
      }

      if (screenshotFiles.length > 0) {
        toast.info(`Lagi ngupload ${screenshotFiles.length} screenshots...`);
        const uploadRes =
          await uploadService.uploadMultipleImages(screenshotFiles);
        finalScreenshots = [...finalScreenshots, ...uploadRes.image_urls];
      }

      if (!finalCoverUrl) {
        toast.error("Cover image wajib diisi bro!");
        setIsLoading(false);
        return;
      }

      const payload: ProjectCreate = {
        title: formData.title,
        slug: formData.slug.toLowerCase().replace(/\s+/g, "-"),
        description: formData.description,
        cover_image_url: finalCoverUrl,
        screenshots: finalScreenshots,
        tech_stack: formData.tech_stack
          .split(",")
          .map((t) => t.trim())
          .filter((t) => t),
        features: formData.features
          .split("|")
          .map((f) => f.trim())
          .filter((f) => f),
        live_demo_url: formData.live_demo_url || null,
        github_url: formData.github_url || null,
        project_duration: formData.project_duration,
        team_size: Number(formData.team_size),
        project_year: Number(formData.project_year),
        is_published: formData.is_published,
      };

      if (isEdit && initialData) {
        await projectService.update(initialData.id, payload);
        toast.success("Project berhasil diupdate!");
      } else {
        await projectService.create(payload);
        toast.success("Project baru berhasil rilis!");
      }

      router.push("/admin/projects");
      router.refresh();
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.detail || "Gagal nyimpen project bro.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col lg:flex-row gap-8">
      <div className="flex-1 space-y-8 bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm">
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 border-b pb-2">
            Basic Info
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">
                Project Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. E-Commerce Pro"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">
                Slug (URL) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="slug"
                name="slug"
                required
                value={formData.slug}
                onChange={handleChange}
                placeholder="e-commerce-pro"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">
              Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              name="description"
              required
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Jelasin tentang project ini..."
            />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 border-b pb-2">
            Technical Details
          </h2>

          <div className="space-y-2">
            <Label htmlFor="tech_stack">
              Tech Stack (Pisahkan dengan koma)
            </Label>
            <Input
              id="tech_stack"
              name="tech_stack"
              value={formData.tech_stack}
              onChange={handleChange}
              placeholder="React, Next.js, Tailwind, PostgreSQL"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="features">
              Key Features (Pisahkan dengan garis vertikal | )
            </Label>
            <Textarea
              id="features"
              name="features"
              value={formData.features}
              onChange={handleChange}
              rows={3}
              placeholder="User Authentication | Realtime Chat | Payment Gateway Stripe"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="project_duration">Duration</Label>
              <Input
                id="project_duration"
                name="project_duration"
                required
                value={formData.project_duration}
                onChange={handleChange}
                placeholder="3 Months"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="team_size">Team Size</Label>
              <Input
                type="number"
                id="team_size"
                name="team_size"
                required
                min={1}
                value={formData.team_size}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="project_year">Year</Label>
              <Input
                type="number"
                id="project_year"
                name="project_year"
                required
                value={formData.project_year}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 border-b pb-2">
            Links
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="live_demo_url">Live Demo URL</Label>
              <Input
                id="live_demo_url"
                name="live_demo_url"
                value={formData.live_demo_url}
                onChange={handleChange}
                placeholder="https://..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="github_url">GitHub Repository URL</Label>
              <Input
                id="github_url"
                name="github_url"
                value={formData.github_url}
                onChange={handleChange}
                placeholder="https://github.com/..."
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-80 space-y-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <h2 className="font-bold text-slate-900">Visibility</h2>
          <label className="flex items-center gap-3 p-3 border rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
            <input
              type="checkbox"
              checked={formData.is_published}
              onChange={handleCheckbox}
              className="w-5 h-5 text-green-600 rounded focus:ring-green-600"
            />
            <div>
              <p className="font-semibold text-slate-700">Publish Project</p>
              <p className="text-xs text-slate-500">Tampil di halaman public</p>
            </div>
          </label>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 hover:bg-green-700 text-white h-12 rounded-xl shadow-md"
          >
            {isLoading ? (
              "Menyimpan..."
            ) : (
              <>
                <Save className="w-5 h-5 mr-2" />{" "}
                {isEdit ? "Update Project" : "Save Project"}
              </>
            )}
          </Button>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <h2 className="font-bold text-slate-900">
            Cover Image <span className="text-red-500">*</span>
          </h2>
          <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center hover:bg-slate-50 transition-colors relative">
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setCoverFile(e.target.files[0]);
                }
              }}
            />
            {coverFile ? (
              <div className="text-green-600 font-medium text-sm flex flex-col items-center">
                <ImageIcon className="w-8 h-8 mb-2" />
                {coverFile.name}
              </div>
            ) : formData.cover_image_url ? (
              <div className="text-slate-600 font-medium text-sm">
                <img
                  src={formData.cover_image_url}
                  alt="Cover"
                  className="rounded-lg h-24 w-full object-cover mb-2"
                />
                Klik untuk ganti gambar
              </div>
            ) : (
              <div className="text-slate-500 flex flex-col items-center">
                <UploadCloud className="w-8 h-8 mb-2 text-slate-400" />
                <span className="text-sm font-medium">
                  Klik atau drag file kesini
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <h2 className="font-bold text-slate-900">Screenshots (Optional)</h2>
          <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center hover:bg-slate-50 transition-colors relative">
            <input
              type="file"
              accept="image/*"
              multiple
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={(e) => {
                if (e.target.files) {
                  setScreenshotFiles(Array.from(e.target.files));
                }
              }}
            />
            <div className="text-slate-500 flex flex-col items-center">
              <UploadCloud className="w-8 h-8 mb-2 text-slate-400" />
              <span className="text-sm font-medium">
                {screenshotFiles.length > 0
                  ? `${screenshotFiles.length} file dipilih`
                  : "Upload beberapa gambar"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
