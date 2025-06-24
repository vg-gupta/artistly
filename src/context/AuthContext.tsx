"use client";
import { createContext, useContext } from "react";

export const AuthContext = createContext({ user: { role: "manager" } }); // Change role to "user" for non-managers

export function useAuth() {
  return useContext(AuthContext);
} 