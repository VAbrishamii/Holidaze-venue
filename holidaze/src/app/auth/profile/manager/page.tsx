"use client";
import BookedSection from "@/component/profile/BookedSection";
import ProfileHeader from "@/component/profile/ProfileHeader";
import { useAuth } from "@/hooks/useAuth";
import { Book } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ManagerProfile() {
  const router = useRouter();

  const { user, avatar, banner, isManager, logout } = useAuth();
  console.log("user", user);
  if (!user) return null;
  return (
    <div className="p-4 max-w-5xl mx-auto">
      <ProfileHeader
        name={user.name}
        avatarUrl={avatar || undefined}
        bannerUrl={banner || undefined}
      />
      <BookedSection />

      {/* ...more sections like bookings and menu */}
    </div>
  );
}
