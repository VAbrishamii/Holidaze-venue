import Image from "next/image";
import SmartImage from "../ui/SmartImage";

type ProfileHeaderProps = {
  name: string;
  avatarUrl?: string;
  bannerUrl?: string;
};
/**
 * ProfileHeader component
 * ProfileHeader is a component that displays the user's profile header.
 * It includes a banner image, avatar image, and the user's name.
 * The component is designed to be responsive and visually appealing.
 */
export default function ProfileHeader({
  name,
  avatarUrl,
  bannerUrl,
}: ProfileHeaderProps) {
  return (
    <div className="relative  flex flex-col w-full mb-8">
      {/* Banner */}
      <div className="w-full bg-gradient-to-b from-[var(--color-primary)] to-white h-40 rounded-md bg-white overflow-hidden">
        {bannerUrl ? (
          <SmartImage
            src={bannerUrl}
            alt="Banner"
            width={1920}
            height={400}
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <h1 className="font-semibold first-letter:uppercase">{name}</h1>
          </div>
        )}
      </div>

      {/* Avatar */}
      <div className="w-24 h-24 -mt-12 ml-10 rounded-full border-4 border-white overflow-hidden">
        {/* <img
          src={avatarUrl || "/default-avatar.png"}
          alt={name || "User Avatar"}
          className="object-cover w-full h-full"
        /> */}
        <Image
          src={avatarUrl || "/default-avatar.png"}
          alt={name || "User Avatar"}
          width={96}
          height={96}
          className="object-cover w-full h-full"
        />
      </div>
      {/* Name */}
      <h1 className="mt-4 text-xl font-semibold ml-14 first-letter:uppercase">
        {name}
      </h1>
    </div>
  );
}
