import type { Metadata } from "next";
import ReactQueryProvider from "@/Lib/react-query-provider";
import "./globals.css";
import Navbar from "@/component/layout/Navbar";
import Footer from "@/component/layout/Footer";
import React from "react";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthContext";
import { LoaderProvider } from "@/context/LoaderContext";
import { Nunito, Rubik } from "next/font/google";
import RouteLoaderListener from "@/component/layout/RouteLoaderListener";
import ClientWrapper from "@/component/layout/ClientWrapper";
export const metadata: Metadata = {
  title: "Holidaze",
  description: "Find and manage your venue",
};
const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik",
  weight: ["400", "500", "700"],
  display: "swap",
});
const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["400", "500", "700"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${nunito.variable} ${rubik.variable}`}>
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
