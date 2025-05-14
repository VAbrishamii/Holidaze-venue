"use client";
import BookedSection from "@/component/profile/BookedSection";
import ProfileHeader from "@/component/profile/ProfileHeader";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import SidebarMenu from "@/component/profile/SidebarMenu";

export default function CustomerProfile() {
  const router = useRouter();

  const { user, avatar, banner } = useAuth();
  console.log("user", user);
  if (!user) return null;
  return (
    <div className="p-4 max-w-5xl mx-auto">
      <ProfileHeader
        name={user.name}
        avatarUrl={avatar || undefined}
        bannerUrl={banner || undefined}
      />
      <div className="w-full max-w-7xl mx-auto px-4 flex gap-8 py-8 min-h-[calc(100vh-4rem)]">
        <SidebarMenu />
        <BookedSection />
      </div>
    </div>
  );
}
