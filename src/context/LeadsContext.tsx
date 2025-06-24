"use client";
import { createContext, useContext, useEffect, useState } from "react";

export type Lead = {
  id: string;
  artistId: number;
  name: string;
  email: string;
  date: string;
  message: string;
  status: "pending" | "accepted" | "rejected";
};

const LeadsContext = createContext<{
  leads: Lead[];
  addLead: (lead: Omit<Lead, "id" | "status">) => void;
  updateLeadStatus: (id: string, status: Lead["status"]) => void;
} | null>(null);

export function LeadsProvider({ children }: { children: React.ReactNode }) {
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("leads");
    if (stored) setLeads(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("leads", JSON.stringify(leads));
  }, [leads]);

  const addLead = (lead: Omit<Lead, "id" | "status">) => {
    setLeads((prev) => [
      { ...lead, id: crypto.randomUUID(), status: "pending" },
      ...prev,
    ]);
  };

  const updateLeadStatus = (id: string, status: Lead["status"]) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
  };

  return (
    <LeadsContext.Provider value={{ leads, addLead, updateLeadStatus }}>
      {children}
    </LeadsContext.Provider>
  );
}

export function useLeads() {
  const ctx = useContext(LeadsContext);
  if (!ctx) throw new Error("useLeads must be used within LeadsProvider");
  return ctx;
} 