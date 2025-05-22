import EditProfileForm from "@/component/profile/EditProfileForm";
/**
 * EditProfilePage component
 * - Displays the form to edit user profile information
 * - Uses EditProfileForm component to handle form submission
 */
export default function EditProfilePage() {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>

      <EditProfileForm />
    </div>
  );
}
