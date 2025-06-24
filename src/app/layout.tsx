import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { ThemeProvider } from "@/context/ThemeContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Suspense } from "react";
import { ShortlistProvider } from "@/context/ShortlistContext";
import { LeadsProvider } from "@/context/LeadsContext";
import { Toaster } from "@/components/ui/sonner";
import { RoleProvider } from "@/context/RoleProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <RoleProvider>
          <ThemeProvider>
            <LeadsProvider>
              <ShortlistProvider>
                <Header right={<ThemeToggle />} />
                <Suspense fallback={<div className="w-full text-center py-10">Loading...</div>}>
                  <main className="min-h-[80vh]">
                    {children}
                  </main>
                </Suspense>
              </ShortlistProvider>
            </LeadsProvider>
          </ThemeProvider>
        </RoleProvider>
        <Toaster />
      </body>
    </html>
  );
}
