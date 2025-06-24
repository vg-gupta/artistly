import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useShortlist } from "@/context/ShortlistContext";
import { Heart } from "lucide-react";
import { BookingModal } from "@/components/BookingModal";
import { useLeads } from "@/context/LeadsContext";
import { useState } from "react";
import { toast } from "sonner";

export function ArtistCard({ artist }: { artist: any }) {
  const { shortlist, toggleShortlist } = useShortlist();
  const isShortlisted = shortlist.includes(artist.id);
  const [modalOpen, setModalOpen] = useState(false);
  const { addLead } = useLeads();

  return (
    <Card className="relative flex flex-col gap-3 p-5 shadow-md mb-6">
      <button
        className="absolute top-3 right-3 z-10 p-1 rounded-full bg-white/80 hover:bg-pink-100 transition"
        aria-label={isShortlisted ? "Remove from shortlist" : "Add to shortlist"}
        onClick={() => toggleShortlist(artist.id)}
      >
        <Heart
          className={`w-6 h-6 ${isShortlisted ? "fill-pink-500 text-pink-500" : "text-gray-400"}`}
        />
      </button>
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold overflow-hidden">
          {artist.image ? (
            <img src={artist.image} alt={artist.name} className="w-16 h-16 rounded-full object-cover" />
          ) : (
            artist.name[0]
          )}
        </div>
        <div>
          <h2 className="text-lg font-semibold">{artist.name}</h2>
          <div className="text-xs text-muted-foreground">{artist.category}</div>
        </div>
      </div>
      <div className="text-sm mt-2">Location: <span className="font-medium">{artist.location}</span></div>
      <div className="text-sm">Price: <span className="font-medium">${artist.price}</span></div>
      <Button className="mt-3 w-full h-12 text-base" variant="default" size="lg" onClick={() => setModalOpen(true)}>
        Ask for Quote
      </Button>
      <BookingModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        artistName={artist.name}
        onSubmit={async (data) => {
          addLead({ ...data, artistId: artist.id });
          toast.success("Booking request sent!");
        }}
      />
    </Card>
  );
} 