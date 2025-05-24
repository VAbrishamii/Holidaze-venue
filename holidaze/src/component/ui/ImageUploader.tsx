"use client";

import { useRef, useState } from "react";
import { UploadCloud, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import SmartImage from "./SmartImage";

interface ImageUploaderProps {
  label?: string;
  value: string[];
  onChange: (images: string[]) => void;
  multiple?: boolean;
}

/**
 * ImageUploader Component (Flexible)
 * - Supports both single and multiple image uploads based on `multiple` prop
 * - Uploads to Cloudinary and previews the image(s)
 */
export default function ImageUploader({
  label = "Upload Image",
  value,
  onChange,
  multiple = false,
}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);

    const uploadedUrls: string[] = [];

    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "holidaze-uploade");

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/viha123/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();

        if (!response.ok || !data.secure_url) {
          toast.error(data.error?.message || "Upload failed.");
          continue;
        }

        uploadedUrls.push(data.secure_url);
      } catch (err) {
        console.error(err);
        toast.error("Upload failed. Try again.");
      }
    }

    if (uploadedUrls.length > 0) {
      const updated = multiple
        ? [...value, ...uploadedUrls]
        : [uploadedUrls[0]];
      onChange(updated);
      toast.success("Image uploaded!");
    }

    setIsUploading(false);
  };

  const removeImage = (index: number) => {
    const updated = [...value];
    updated.splice(index, 1);
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      {label && <label htmlFor="image-upload-input" className="block font-medium">{label}</label>}

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
        {value.map((url, index) => (
          <div
            key={index}
            className="relative w-24 h-24 rounded border overflow-hidden group">
            <SmartImage
              src={url}
              alt={`Uploaded ${index + 1}`}
              width={400}
              height={400}
              className="object-cover w-full h-full"
              fallback
            />

            {multiple && (
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 bg-white p-1 rounded-full shadow hover:text-red-600">
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="flex items-center gap-2 px-4 py-2 border rounded bg-background hover:bg-gray-100 transition">
        <UploadCloud className="w-5 h-5" />
        {isUploading
          ? "Uploading..."
          : multiple
            ? "Add Images"
            : "Upload Image"}
      </button>
       

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple={multiple}
        onChange={handleUpload}
        className="hidden"
      />
    </div>
  );
}
