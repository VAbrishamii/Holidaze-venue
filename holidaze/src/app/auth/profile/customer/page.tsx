// components/profile/CustomerProfile.tsx

import ProfileHeader from "@/component/profile/ProfileHeader";
import { useUser } from "@/hooks/useUser"; 
// import { useRouter } from "next/navigation";

export default function CustomerProfile() {
  // const router = useRouter();
  const user = useUser(); 
  console.log('user', user);

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <ProfileHeader
        name={user.name}
        avatarUrl={user.avatar}
        bannerUrl={user.banner}
        onEdit={() => router.push("/profile/edit")}
      />

      {/* ...more sections like bookings and menu */}
    </div>
  );
}
