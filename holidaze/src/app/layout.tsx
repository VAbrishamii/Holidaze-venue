import type { Metadata } from "next";
import  ReactQueryProvider  from "@/Lib/react-query-provider";
import "./globals.css";
import Navbar from "@/component/layout/Navbar";
import Footer from "@/component/layout/Footer";
import React from "react";

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
      <body>
        <ReactQueryProvider>
        <Navbar />
        <main>{children}</main>
        <Footer />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
