import RegisterWithModalWrapper from "@/component/auth/RegisterWithModalWrapper";
/**
  * RegisterPage component for the Holidaze app.
  
 */
export default function RegisterPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b bg-[var(--color-darkgreen)] to-green-700 p-3">
      <div className="bg-white p-8 rounded-2xl shadow-md max-w-md w-full px-4 sm:px-6 sm:p-4 lg:px-8 ">
        <RegisterWithModalWrapper />
      </div>
    </div>
  );
}
