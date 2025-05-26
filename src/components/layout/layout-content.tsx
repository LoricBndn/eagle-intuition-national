'use client';

import { usePathname } from 'next/navigation';
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { ReactNode } from "react";

export default function LayoutContent({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navbar />}
      {children}
      {!isAdminRoute && <Footer />}
    </>
  );
}
