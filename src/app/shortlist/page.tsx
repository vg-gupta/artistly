"use client";
import { useShortlist } from "@/context/ShortlistContext";
import { artistsData } from "@/data/artists";
import { ArtistCard } from "@/components/ArtistCard";

export default function ShortlistPage() {
  const { shortlist } = useShortlist();
  const shortlistedArtists = artistsData.filter((a) => shortlist.includes(a.id));
  return (
    <div className="w-full flex flex-col items-center max-w-6xl mx-auto px-2 py-8">
      <h1 className="text-3xl font-bold mb-6 w-full text-center">Shortlisted Artists</h1>
      <div className="w-full max-w-md mx-auto flex flex-col items-center">
        {shortlistedArtists.length ? (
          shortlistedArtists.map((artist) => <ArtistCard key={artist.id} artist={artist} />)
        ) : (
          <div className="text-center text-muted-foreground">No artists shortlisted yet.</div>
        )}
      </div>
    </div>
  );
} 