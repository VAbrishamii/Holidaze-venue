import type { Metadata } from "next";
import ReactQueryProvider from "@/Lib/react-query-provider";
import "./globals.css";
import Navbar from "@/component/layout/Navbar";
import Footer from "@/component/layout/Footer";
import React from "react";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthContext";
import { LoaderProvider } from "@/context/LoaderContext";
// import GlobalLoader from "@/component/layout/GlobalLoader";
import RouteLoaderListener from "@/component/layout/RouteLoaderListener";
import ClientWrapper from "@/component/layout/ClientWrapper";
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
          <AuthProvider>
            <LoaderProvider>
              <ClientWrapper >
              <RouteLoaderListener />
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <Toaster position="bottom-right" reverseOrder={false} />
            </ClientWrapper>
            </LoaderProvider>
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
