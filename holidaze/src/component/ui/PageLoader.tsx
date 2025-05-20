import LoadingSpinner from "./LoadingSpinner";

export default function PageLoader() {
  return (
    <div className="fixed flex inset-0 z-50 justify-center items-center">
      <LoadingSpinner size={32} />
    </div>
  );
}
