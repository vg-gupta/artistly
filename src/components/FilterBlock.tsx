import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMemo } from "react";

export function FilterBlock({
  category,
  setCategory,
  location,
  setLocation,
  priceRange,
  setPriceRange,
  artists,
}: any) {
  // Unique categories and locations from data
  const categories = useMemo(() => Array.from(new Set(artists.map((a: any) => a.category))) as string[], [artists]);
  const locations = useMemo(() => Array.from(new Set(artists.map((a: any) => a.location))) as string[], [artists]);

  const fixedCategories = ["Singers", "Dancers", "DJs", "Speakers"];

  return (
    <div className="flex flex-col md:flex-row gap-4 items-center bg-muted/40 p-4 rounded-lg">
      <div>
        <label className="block text-xs mb-1">Category</label>
        <select
          className="border rounded px-2 py-1 min-w-[120px]"
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          <option value="">All</option>
          {fixedCategories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-xs mb-1">Location</label>
        <select
          className="border rounded px-2 py-1 min-w-[120px]"
          value={location}
          onChange={e => setLocation(e.target.value)}
        >
          <option value="">All</option>
          {locations.map((loc: string) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-1">
        <label className="block text-xs mb-1">Price Range</label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            min={0}
            max={priceRange[1]}
            value={priceRange[0]}
            onChange={e => setPriceRange([+e.target.value, priceRange[1]])}
            className="w-20"
            placeholder="Min"
          />
          <span>-</span>
          <Input
            type="number"
            min={priceRange[0]}
            value={priceRange[1]}
            onChange={e => setPriceRange([priceRange[0], +e.target.value])}
            className="w-20"
            placeholder="Max"
          />
        </div>
      </div>
      <Button variant="outline" size="sm" onClick={() => {
        setCategory("");
        setLocation("");
        setPriceRange([0, 10000]);
      }}>Reset</Button>
    </div>
  );
} 