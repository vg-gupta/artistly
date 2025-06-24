"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const [role, setRole] = useState("user");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("artistly_role", role);
    // Reload the page to update AuthContext
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="p-8 w-full max-w-sm flex flex-col gap-6 shadow-lg border border-gray-200">
        <h1 className="text-2xl font-bold mb-2 text-center">Login</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <label className="font-medium">Select Role:</label>
          <select
            className="border rounded px-3 py-2"
            value={role}
            onChange={e => setRole(e.target.value)}
          >
            <option value="user">User</option>
            <option value="manager">Manager</option>
          </select>
          <Button type="submit" className="mt-4 w-full">Login</Button>
        </form>
      </Card>
    </div>
  );
} 