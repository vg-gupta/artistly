"use client";
import { createContext, useContext, useEffect, useState } from "react";

const ShortlistContext = createContext<{
  shortlist: number[];
  toggleShortlist: (id: number) => void;
} | null>(null);

export function ShortlistProvider({ children }: { children: React.ReactNode }) {
  const [shortlist, setShortlist] = useState<number[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("shortlist");
    if (stored) setShortlist(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("shortlist", JSON.stringify(shortlist));
  }, [shortlist]);

  const toggleShortlist = (id: number) => {
    setShortlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <ShortlistContext.Provider value={{ shortlist, toggleShortlist }}>
      {children}
    </ShortlistContext.Provider>
  );
}

export function useShortlist() {
  const ctx = useContext(ShortlistContext);
  if (!ctx) throw new Error("useShortlist must be used within ShortlistProvider");
  return ctx;
} 