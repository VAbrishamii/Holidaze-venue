"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/hooks/useAuth";
import toast from "react-hot-toast";
import { updateProfile } from "@/Lib/api/profile";
import ImageUploader from "../ui/ImageUploader";

//zod schema for validation
const schema = z.object({
  avatar: z.string().url("Please enter a valid avatar image URL"),
});

type EditProfileFormData = z.infer<typeof schema>;
/**
 * EditProfileForm component
 * EditProfileForm is a form component that allows users to update their profile information.
 * It includes an image uploader for the avatar and a submit button.

 */
export default function EditProfileForm() {
  const { user, avatar, banner, token, setAuth, isManager } = useAuth();

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<EditProfileFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      avatar: avatar || "",
    },
  });
  const onSubmit = async (formData: EditProfileFormData) => {
    if (!user || !user.name) {
      toast.error("User is not loaded yet.");
      return;
    }

    const payload = {
      avatar: { url: formData.avatar },
    };

    await updateProfile(user.name, payload);
    setAuth(token, user, formData.avatar, isManager);

    toast.success("Profile updated!");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <ImageUploader
        label="Profile Picture"
        value={avatar ? [avatar] : []}
        onChange={(urls) => {
          const avatarUrl = urls[0] || "";
          setValue("avatar", avatarUrl); // update the form value
        }}
      />
      {errors.avatar && (
        <p className="text-red-500 text-sm">{errors.avatar.message}</p>
      )}

      {/*  Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-[var(--color-darkgreen)] text-white font-semibold py-2 px-4 rounded hover:bg-primary-dark transition disabled:opacity-50">
        {isSubmitting ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}
