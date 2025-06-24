"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { artistsData } from "@/data/artists";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const mockEvents = [
  { id: 1, name: "Corporate Gala", date: "2023-11-10", location: "New York", description: "Performed at a high-profile corporate event." },
  { id: 2, name: "Wedding Reception", date: "2023-09-22", location: "Los Angeles", description: "Star performance at a celebrity wedding." },
  { id: 3, name: "Music Festival", date: "2023-07-15", location: "Chicago", description: "Headline act at a summer music festival." },
];

export default function ArtistProfilePage() {
  const { id } = useParams();
  const [artist, setArtist] = useState<any>(null);

  useEffect(() => {
    if (!id) return;
    let found = null;
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("artistly_artists");
      if (stored) {
        found = JSON.parse(stored).find((a: any) => String(a.id) === String(id));
      }
    }
    if (!found) {
      found = artistsData.find((a: any) => String(a.id) === String(id));
    }
    setArtist(found);
  }, [id]);

  if (!artist) {
    return <div className="max-w-2xl mx-auto py-12 text-center text-lg">Artist not found.</div>;
  }

  const categories = Array.isArray(artist.category) ? artist.category : [artist.category];

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start md:items-stretch">
        <Card className="p-8 flex flex-col items-center gap-4 shadow-lg border border-gray-200 rounded-2xl bg-white h-full justify-start">
          <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center text-4xl font-bold overflow-hidden mb-2 shadow-md border-4 border-white">
            {artist.image ? (
              <img src={artist.image} alt={artist.name} className="w-32 h-32 rounded-full object-cover" />
            ) : (
              <span className="text-gray-300">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 12c2.7 0 4.5-2.2 4.5-4.5S14.7 3 12 3 7.5 5.2 7.5 7.5 9.3 12 12 12zm0 2c-3 0-9 1.5-9 4.5V21h18v-2.5c0-3-6-4.5-9-4.5z" />
                </svg>
              </span>
            )}
          </div>
          <h1 className="text-3xl font-extrabold mb-1 text-gray-900">{artist.name}</h1>
          <div className="flex flex-wrap gap-2 mb-2">
            {categories.map((cat: string) => (
              <span key={cat} className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold tracking-wide">{cat}</span>
            ))}
          </div>
          <div className="text-gray-500 mb-1 text-base flex items-center gap-1">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" /><circle cx="12" cy="8" r="3" /></svg>
            {artist.location}
          </div>
          <div className="text-lg font-bold text-indigo-700 mb-2">Fee: <span className="text-gray-900">${artist.price}</span></div>
        </Card>
        <div className="flex flex-col h-full justify-start">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 17l4 4 4-4m-4-5v9" /></svg>
            Past Events
          </h2>
          <div className="flex flex-col gap-5">
            {mockEvents.map(event => (
              <Card key={event.id} className="p-5 flex flex-row items-start gap-4 border-l-4 border-indigo-400 bg-gray-50 shadow-sm">
                <div className="flex-shrink-0 mt-1">
                  <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" /></svg>
                </div>
                <div>
                  <div className="font-semibold text-lg text-gray-900 mb-1">{event.name}</div>
                  <div className="text-xs text-gray-500 mb-1">{event.date} &middot; {event.location}</div>
                  <div className="text-sm text-gray-700">{event.description}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 