// components/common/ProfileHeader.tsx

type ProfileHeaderProps = {
  name: string;
  avatarUrl?: string;
  bannerUrl?: string;
  onEdit: () => void;
};

export default function ProfileHeader({
  name,
  avatarUrl,
  bannerUrl,
  onEdit,
}: ProfileHeaderProps) {
  return (
    <div className="relative flex flex-col items-center w-full mb-8">
      {/* Banner */}
      <div className="w-full h-40 rounded-md bg-gray-200 overflow-hidden">
        {bannerUrl ? (
          <img src={bannerUrl} alt="Banner" className="object-cover w-full h-full" />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">Banner</div>
        )}
      </div>

      {/* Avatar */}
      <div className="w-24 h-24 -mt-12 rounded-full border-4 border-white overflow-hidden">
        <img
          src={avatarUrl || "/default-avatar.png"}
          alt={name}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Edit Button */}
      <button onClick={onEdit} className="mt-2 text-sm text-blue-600 hover:underline">
        Edit
      </button>
    </div>
  );
}
