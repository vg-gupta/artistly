"use client";
import { useState, useEffect } from "react";
import { ArtistCard } from "@/components/ArtistCard";
import { FilterBlock } from "@/components/FilterBlock";
import { artistsData } from "@/data/artists";

export default function ArtistsPage() {
  // Filtering state
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [localArtists, setLocalArtists] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("artistly_artists");
      if (stored) {
        setLocalArtists(JSON.parse(stored));
      }
    }
  }, []);

  const allArtists = [...localArtists, ...artistsData];

  // Filter logic
  const filtered = allArtists.filter((artist) => {
    const artistCategories = Array.isArray(artist.category) ? artist.category : [artist.category];
    const matchCategory = category ? artistCategories.includes(category) : true;
    const matchLocation = location ? artist.location === location : true;
    const matchPrice =
      artist.price >= priceRange[0] && artist.price <= priceRange[1];
    return matchCategory && matchLocation && matchPrice;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Explore Artists</h1>
      <FilterBlock
        category={category}
        setCategory={setCategory}
        location={location}
        setLocation={setLocation}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        artists={allArtists}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
        {filtered.length ? (
          filtered.map((artist) => <ArtistCard key={artist.id} artist={artist} />)
        ) : (
          <div className="col-span-full text-center text-muted-foreground">No artists found.</div>
        )}
      </div>
    </div>
  );
} 