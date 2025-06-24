import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function TableRow({ artist }: { artist: any }) {
  const router = useRouter();
  return (
    <tr className="border-b hover:bg-muted/40">
      <td className="px-4 py-2 font-medium flex items-center gap-2">
        {artist.image ? (
          <img src={artist.image} alt={artist.name} className="w-8 h-8 rounded-full object-cover" />
        ) : (
          <span className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 12c2.7 0 4.5-2.2 4.5-4.5S14.7 3 12 3 7.5 5.2 7.5 7.5 9.3 12 12 12zm0 2c-3 0-9 1.5-9 4.5V21h18v-2.5c0-3-6-4.5-9-4.5z" />
            </svg>
          </span>
        )}
        {artist.name}
      </td>
      <td className="px-4 py-2">{artist.location}</td>
      <td className="px-4 py-2">{artist.category}</td>
      <td className="px-4 py-2">${artist.price}</td>
      <td className="px-4 py-2">
        <Button size="sm" variant="outline" className="flex items-center gap-1" onClick={() => router.push(`/artists/${artist.id}`)}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M1.5 12s3.5-7 10.5-7 10.5 7 10.5 7-3.5 7-10.5 7S1.5 12 1.5 12z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          View
        </Button>
      </td>
    </tr>
  );
} 