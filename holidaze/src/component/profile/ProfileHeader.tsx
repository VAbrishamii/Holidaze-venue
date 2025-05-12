// components/common/ProfileHeader.tsx

type ProfileHeaderProps = {
  name: string;
  avatarUrl?: string;
  bannerUrl?: string;
};

export default function ProfileHeader({
  name,
  avatarUrl,
  bannerUrl,
}: ProfileHeaderProps) {
  return (
    <div className="relative flex flex-col w-full mb-8">
      {/* Banner */}
      <div className="w-full h-40 rounded-md bg-gray-200 overflow-hidden">
        {bannerUrl ? (
          <img
            src={bannerUrl}
            alt="Banner"
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Banner
          </div>
        )}
      </div>

      {/* Avatar */}
      <div className="w-24 h-24 -mt-12 ml-10 rounded-full border-4 border-white overflow-hidden">
        <img
          src={avatarUrl || "/default-avatar.png"}
          alt={name || "User Avatar"}
          className="object-cover w-full h-full"
        />
      </div>
      {/* Name */}
      <h1 className="mt-4 text-xl font-semibold ml-14">{name}</h1>

      {/* Edit Button */}
      {/* <button
        onClick={onEdit}
        className="mt-2 text-sm text-blue-600 hover:underline">
        Edit
      </button> */}
    </div>
  );
}
