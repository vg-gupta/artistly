"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";

export default function Header({ right }: { right?: React.ReactNode }) {
  const { user } = useAuth();
  const pathname = usePathname();
  return (
    <header className="w-full flex items-center justify-between py-4 px-4 md:px-8 border-b bg-white/80 dark:bg-black/80 backdrop-blur z-20">
      <Link href="/" className="text-2xl font-bold tracking-tight text-primary">
        Artistly<span className="text-indigo-500">.com</span>
      </Link>
      <nav className="flex gap-2 md:gap-4 items-center">
        <Button asChild variant="ghost" size="sm">
          <Link href="/">Home</Link>
        </Button>
        <Button asChild variant="ghost" size="sm">
          <Link href="/artists">Explore Artists</Link>
        </Button>
        <Button asChild variant="ghost" size="sm">
          <Link href="/onboard">Onboard Artist</Link>
        </Button>
        {user?.role === "manager" && pathname !== "/login" && (
          <Button asChild variant="ghost" size="sm">
            <Link href="/dashboard">Manager Dashboard</Link>
          </Button>
        )}
        <Button asChild variant="ghost" size="icon" className="ml-2">
          <Link href="/shortlist" aria-label="Shortlist">
            <Heart className="w-5 h-5" />
          </Link>
        </Button>
      </nav>
      <div className="ml-4 flex items-center gap-2">
        {right}
        {pathname !== "/login" && (
          <Button asChild variant="outline" size="sm">
            <Link href="/login">Login</Link>
          </Button>
        )}
      </div>
    </header>
  );
} 