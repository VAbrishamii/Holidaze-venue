import LoadingSpinner from "./LoadingSpinner";
/**
 * A full-screen loading spinner that appears when the page is loading.
 * It is a simple spinner that covers the entire screen and indicates that the page is loading.
 * It is used to provide feedback to the user while the page is loading.
 */
export default function PageLoader() {
  return (
    <div className="fixed flex inset-0 z-50 justify-center items-center">
      <LoadingSpinner size={32} />
    </div>
  );
}
