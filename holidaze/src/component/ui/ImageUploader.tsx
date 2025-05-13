"use client";
import { useRef, useState } from "react";
import { Image as ImageIcon, UploadCloud } from "lucide-react";
import toast from "react-hot-toast";
import { el, fi } from "date-fns/locale";

type ImageUploaderProps = {
  label: string;
  defaultImage?: string;
  onUrlChange: (url: string) => void;
};
/**
 * ImageUploader Component
 *
 * Allows user to select an image, upload it to Cloudinary, and returns the hosted image URL.
 * Displays a preview and calls onUrlChange with the final URL.
 */
export default function ImageUploader({
  label,
  defaultImage,
  onUrlChange,
}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(
    defaultImage
  );
  const [isUploading, setIsUploading] = useState(false);
  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
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
      if (!response.ok) {
        console.error("Cloudinary Error:", data);
        toast.error(data.error?.message || "Upload failed.");
        return;
      }
      if (data.secure_url) {
        setPreviewUrl(data.secure_url);
        onUrlChange(data.secure_url);
        toast.success("Image uploaded successfully!");
      } else {
        toast.error("Image upload failed. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Image upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };
  return (
    <div className="space-y-2">
      <label className="block font-medium">{label}</label>

      {previewUrl && (
        <img
          src={previewUrl}
          alt="Uploaded preview"
          className="w-full h-48 object-cover rounded border"
        />
      )}

      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="flex items-center gap-2 px-4 py-2 border rounded bg-background hover:bg-gray-100 dark:hover:bg-gray-800 transition">
        <UploadCloud className="w-5 h-5" />
        {isUploading ? "Uploading..." : "Upload Image"}
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />
    </div>
  );
}
