import { api } from "@/lib/api";

interface UploadSingleResponse {
  message: string;
  image_url: string;
}

interface UploadMultipleResponse {
  message: string;
  image_urls: string[];
}

export const uploadService = {
  uploadSingleImage: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post<UploadSingleResponse>(
      "/upload/image",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  },

  uploadMultipleImages: async (files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    const response = await api.post<UploadMultipleResponse>(
      "/upload/images",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  },
};
