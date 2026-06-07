"use client";

import { useAnimeInit } from "@/lib/anime";

export default function AnimeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useAnimeInit();
  return <>{children}</>;
}
