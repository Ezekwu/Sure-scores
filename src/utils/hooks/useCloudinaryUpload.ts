import { useState } from "react";
import { FileData } from "@/components/ui/FilePreview/UiFilePreview";

 export type CloudinaryResponse = {
  created_at: string;
  secure_url: string;
  resource_type: 'image' | 'raw';
  original_filename: string;
}

export default function useCloudinaryUpload() {
  const [errors, setErrors] = useState(null);

  async function uploadFiles(files: File[]) {
    try {
      const urls : Promise<FileData[]> = Promise.all(
        files.map(async (file) => {
          const formData = new FormData();

          formData.append('file', file);
          formData.append('upload_preset', 'brdhoutx');
          formData.append("resource_type", "raw");

          const response = await fetch(`https://api.cloudinary.com/v1_1/dcdfqrryo/upload`, {method: 'POST', body: formData});

          if(!response.ok){
             throw new Error('Failed to upload file')
          }

          const data : CloudinaryResponse = await response.json();
          return {
            name: data.original_filename,
            src: data.secure_url,
            type: data.resource_type,
            created_at: data.created_at
          }
        })
      )
      return urls;
    } catch (error: any) {
      setErrors(error.message)
    }
  }

  return {uploadFiles, errors}
}
