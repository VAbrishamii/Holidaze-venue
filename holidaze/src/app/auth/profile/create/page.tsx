export default function CreateProfile() {
    return (
        <div className="p-4 max-w-5xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Create Profile</h1>
            <form>
                {/* Add form fields here */}
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Create Profile
                </button>
            </form>
        </div>
    );
}