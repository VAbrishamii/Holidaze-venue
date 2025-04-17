import LoadingSpinner from "./LoadingSpinner";

export default function PageLoader() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <LoadingSpinner size={32} />
    </div>
  );
}
