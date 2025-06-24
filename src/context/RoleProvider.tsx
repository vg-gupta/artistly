"use client";
import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<string>("user");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setRole(localStorage.getItem("artistly_role") || "user");
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ user: { role } }}>
      {children}
    </AuthContext.Provider>
  );
} 