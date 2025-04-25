import type { Metadata } from "next";
import ReactQueryProvider from "@/Lib/react-query-provider";
import "./globals.css";
import Navbar from "@/component/layout/Navbar";
import Footer from "@/component/layout/Footer";
import React from "react";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Holidaze",
  description: "Find and manage your venue",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <ReactQueryProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster position="top-right" reverseOrder={false} />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
