"use client";
import { TableRow } from "@/components/TableRow";
import { artistsData } from "@/data/artists";
import { useLeads } from "@/context/LeadsContext";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export default function DashboardPage() {
  const { leads, updateLeadStatus } = useLeads();
  const [localArtists, setLocalArtists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("artistly_artists");
      if (stored) {
        setLocalArtists(JSON.parse(stored));
      }
      setLoading(false);
    }
  }, []);

  const allArtists = [...localArtists, ...artistsData];

  if (loading) {
    return <div className="max-w-5xl mx-auto px-4 py-8 text-center text-lg">Loading...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Manager Dashboard</h1>
      <div className="overflow-x-auto mb-10">
        <table className="min-w-full border rounded-lg overflow-hidden">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">City</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Fee</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {allArtists.map((artist) => (
              <TableRow key={artist.id} artist={artist} />
            ))}
          </tbody>
        </table>
      </div>
      <h2 className="text-2xl font-semibold mb-4">Booking Leads</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border rounded-lg overflow-hidden text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-2 text-left">Artist</th>
              <th className="px-4 py-2 text-left">Event Date</th>
              <th className="px-4 py-2 text-left">Planner</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Message</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {leads.length ? leads.map((lead) => {
              const artist = allArtists.find(a => a.id === lead.artistId);
              return (
                <tr key={lead.id} className="border-b">
                  <td className="px-4 py-2 font-medium">{artist ? artist.name : "Unknown"}</td>
                  <td className="px-4 py-2">{lead.date}</td>
                  <td className="px-4 py-2">{lead.name}</td>
                  <td className="px-4 py-2">{lead.email}</td>
                  <td className="px-4 py-2">{lead.message}</td>
                  <td className="px-4 py-2 capitalize">
                    {lead.status === "pending" && <span className="inline-block px-2 py-1 rounded bg-yellow-100 text-yellow-800">Pending</span>}
                    {lead.status === "accepted" && <span className="inline-block px-2 py-1 rounded bg-green-100 text-green-800">Accepted</span>}
                    {lead.status === "rejected" && <span className="inline-block px-2 py-1 rounded bg-red-100 text-red-800">Rejected</span>}
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    {lead.status === "pending" && <>
                      <Button size="sm" variant="default" aria-label="Accept lead" onClick={() => updateLeadStatus(lead.id, "accepted")}>Accept</Button>
                      <Button size="sm" variant="destructive" aria-label="Reject lead" onClick={() => updateLeadStatus(lead.id, "rejected")}>Reject</Button>
                    </>}
                  </td>
                </tr>
              );
            }) : (
              <tr><td colSpan={7} className="text-center text-muted-foreground py-4">No booking leads yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
} 