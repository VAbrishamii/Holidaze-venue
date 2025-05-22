"use client";
import BookedSection from "@/component/profile/BookedSection";
import ProfileHeader from "@/component/profile/ProfileHeader";
import { useAuth } from "@/hooks/useAuth";
import SidebarMenu from "@/component/profile/SidebarMenu";
import MyVenuesSection from "@/component/profile/MyVenueSection";

/**
 * CustomerProfile component
 * - Displays the user's profile information
 * - Shows the user's avatar and banner
 * - Renders the sidebar menu and booked section
 * - Displays the user's venues if they are a manager
 *
 */
export default function CustomerProfile() {
  const { user, avatar, banner, isManager } = useAuth();
  if (!user) return null;
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Header Section */}
      <ProfileHeader
        name={user.name}
        avatarUrl={avatar || undefined}
        bannerUrl={banner || undefined}
      />

      {/* Sidebar + Content */}
      <div className="grid grid-cols-1 lg:grid-cols-[250px_2fr] gap-6 min-h-[60vh]">
        {/* Sidebar */}
        <aside className="w-full md:w-64 shrink-0">
          <SidebarMenu />
        </aside>

        {/* Main content */}
        <section className="flex-1 min-w-0">
          {/* Venues Section only if manager */}
          {isManager && <MyVenuesSection username={user.name} />}
          <BookedSection />
        </section>
      </div>
    </div>
  );
}
