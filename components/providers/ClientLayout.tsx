"use client";

import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CursorFollower from "@/components/ui/CursorFollower";
import ScrollProgress from "@/components/ui/ScrollProgress";
import LenisProvider from "@/components/providers/LenisProvider";
import GSAPProvider from "@/components/providers/GSAPProvider";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LenisProvider>
      <GSAPProvider>
        <CursorFollower />
        <ScrollProgress />
        <TopBar />
        <Navbar />
        <main className="pt-[120px]">{children}</main>
        <Footer />
      </GSAPProvider>
    </LenisProvider>
  );
}
