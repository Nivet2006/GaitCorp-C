"use client";

import { useGSAPInit } from "@/lib/gsap";

export default function GSAPProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useGSAPInit();
  return <>{children}</>;
}
