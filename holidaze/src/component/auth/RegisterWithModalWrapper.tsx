"use client";
import { useState, useEffect } from "react";
import RegisterForm from "@/component/auth/RegisterForm";
import LoginModal from "@/component/ui/LoginModal";

export default function RegisterWithModalWrapper() {
  const [showLoginModal, setShowLoginModal] = useState(false);

  
  useEffect(() => {
    const shouldShowModal = localStorage.getItem("openLoginModal") === "true";
    if (shouldShowModal) {
      setShowLoginModal(true);
      localStorage.removeItem("openLoginModal"); // Clean it up
    }
  }, []);
  return (
    <>
      <RegisterForm onRegisterSuccess={() => setShowLoginModal(true)} />
      {showLoginModal && <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />}
    </>
  );
}
