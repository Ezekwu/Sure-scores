import { useState } from "react";

 export type CloudinaryResponse = {
  created_at: string;
  secure_url: string;
  resource_type: 'image' | 'raw'
}

export default function useCloudinaryUpload() {
  const [errors, setErrors] = useState(null);

  async function uploadFiles(files: File[]) {
    try {
      const urls : Promise<CloudinaryResponse[]> = Promise.all(
        files.map(async (file) => {
          const formData = new FormData();

          formData.append('file', file);
          formData.append('upload_preset', 'brdhoutx');
          formData.append("resource_type", "raw");

          const response = await fetch(`https://api.cloudinary.com/v1_1/dcdfqrryo/upload`, {method: 'POST', body: formData});

          if(!response.ok){
             throw new Error('Failed to upload file')
          }

          const {created_at, resource_type, secure_url}: CloudinaryResponse = await response.json();
          return {created_at, resource_type, secure_url}
        })
      )
      return urls;
    } catch (error: any) {
      setErrors(error.message)
    }
  }

  return {uploadFiles, errors}
}