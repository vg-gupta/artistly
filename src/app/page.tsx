import React from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Music, Mic, Headphones, Users, Star, CalendarCheck, ClipboardList, Search, ShieldCheck, Bell, LayoutDashboard } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

const categories = [
  {
    name: "Singers",
    icon: <Mic className="w-8 h-8 text-indigo-500" />,
    description: "Book vocalists for any event.",
  },
  {
    name: "Dancers",
    icon: <Users className="w-8 h-8 text-pink-500" />,
    description: "Find talented dancers and troupes.",
  },
  {
    name: "DJs",
    icon: <Headphones className="w-8 h-8 text-green-500" />,
    description: "Hire DJs for parties and clubs.",
  },
  {
    name: "Speakers",
    icon: <Music className="w-8 h-8 text-yellow-500" />,
    description: "Engage inspiring speakers.",
  },
];

const languageOptions = ["English", "Spanish", "French", "Hindi", "Other"];

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto py-8 px-4 gap-8">
      {/* Hero Section */}
      <section className="text-center flex flex-col gap-4 mt-8">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2">
          Book Performing Artists Effortlessly
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-4">
          Discover, book, and manage top singers, DJs, dancers, and speakers for your next event.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild size="lg">
            <Link href="/artists">Explore Artists</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/onboard">Onboard Artist</Link>
          </Button>
        </div>
      </section>
      {/* Category Cards */}
      <section className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        {categories.map((cat) => (
          <Card key={cat.name} className="flex flex-col items-center p-6 gap-3 shadow-md hover:shadow-lg transition-shadow">
            {cat.icon}
            <h3 className="text-lg font-semibold mt-2">{cat.name}</h3>
            <p className="text-sm text-muted-foreground text-center">{cat.description}</p>
          </Card>
        ))}
      </section>
      {/* Overview of the Platform Section */}
      <section className="w-full max-w-4xl mx-auto mt-12">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Overview of the Platform
        </h2>
        {/* Stepper */}
        <div className="flex flex-col items-center mb-10">
          <div className="flex flex-row justify-center items-center gap-4 w-full max-w-2xl">
            {[
              { icon: <Users className="w-6 h-6 text-indigo-500" />, label: "Browse Artists" },
              { icon: <Star className="w-6 h-6 text-pink-500" />, label: "Shortlist" },
              { icon: <CalendarCheck className="w-6 h-6 text-green-500" />, label: "Book" },
              { icon: <ClipboardList className="w-6 h-6 text-yellow-500" />, label: "Manage" },
            ].map((step, i, arr) => (
              <React.Fragment key={step.label}>
                <div className="flex flex-col items-center transition-all duration-500 hover:scale-105">
                  <div className="rounded-full w-12 h-12 flex items-center justify-center bg-gradient-to-br from-indigo-100 to-white shadow mb-2 border-2 border-indigo-200 font-bold text-lg">{i + 1}</div>
                  <div>{step.icon}</div>
                  <div className="text-xs font-medium mt-1 text-center">{step.label}</div>
                </div>
                {i < arr.length - 1 && (
                  <div className="h-1 w-8 bg-gradient-to-r from-indigo-200 to-indigo-400 rounded" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex flex-col items-center bg-white dark:bg-black/60 rounded-xl shadow p-6 border-t-4 border-blue-500 transition-all duration-500 hover:scale-105 hover:shadow-lg">
            <Search className="w-10 h-10 text-blue-500 mb-2" />
            <h3 className="font-semibold text-lg mb-1">Fast Search</h3>
            <p className="text-sm text-muted-foreground text-center">Quickly find the perfect artist for your event with powerful filters.</p>
          </div>
          <div className="flex flex-col items-center bg-white dark:bg-black/60 rounded-xl shadow p-6 border-t-4 border-green-500 transition-all duration-500 hover:scale-105 hover:shadow-lg">
            <ShieldCheck className="w-10 h-10 text-green-500 mb-2" />
            <h3 className="font-semibold text-lg mb-1">Secure Booking</h3>
            <p className="text-sm text-muted-foreground text-center">All booking requests are safe, private, and handled with care.</p>
          </div>
          <div className="flex flex-col items-center bg-white dark:bg-black/60 rounded-xl shadow p-6 border-t-4 border-pink-500 transition-all duration-500 hover:scale-105 hover:shadow-lg">
            <Bell className="w-10 h-10 text-pink-500 mb-2" />
            <h3 className="font-semibold text-lg mb-1">Real-Time Notifications</h3>
            <p className="text-sm text-muted-foreground text-center">Get instant updates on booking status and artist responses.</p>
          </div>
          <div className="flex flex-col items-center bg-white dark:bg-black/60 rounded-xl shadow p-6 border-t-4 border-yellow-500 transition-all duration-500 hover:scale-105 hover:shadow-lg">
            <LayoutDashboard className="w-10 h-10 text-yellow-500 mb-2" />
            <h3 className="font-semibold text-lg mb-1">Manager Dashboard</h3>
            <p className="text-sm text-muted-foreground text-center">Artist managers can track, accept, or reject leads in one place.</p>
          </div>
        </div>
      </section>
      
    </div>
  );
}
