"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export function BookingModal({ open, onOpenChange, onSubmit, artistName }: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onSubmit: (data: { name: string; email: string; date: string; message: string }) => void;
  artistName: string;
}) {
  const [form, setForm] = useState({ name: "", email: "", date: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md w-full p-6 rounded-lg relative">
        <button
          className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100 focus:outline-none"
          aria-label="Close booking modal"
          onClick={() => onOpenChange(false)}
        >
          <X className="w-5 h-5" />
        </button>
        <DialogHeader>
          <DialogTitle>Request Booking: {artistName}</DialogTitle>
          <div className="text-lg mb-2 font-semibold" />
        </DialogHeader>
        <form
          className="flex flex-col gap-3"
          onSubmit={async (e) => {
            e.preventDefault();
            setSubmitting(true);
            await onSubmit(form);
            setSubmitting(false);
            onOpenChange(false);
          }}
        >
          <Input
            required
            placeholder="Your Name"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            aria-label="Your Name"
          />
          <Input
            required
            type="email"
            placeholder="Your Email"
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            aria-label="Your Email"
          />
          <Input
            required
            type="date"
            placeholder="Event Date"
            value={form.date}
            onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
            aria-label="Event Date"
          />
          <Input
            required
            placeholder="Message / Event Details"
            value={form.message}
            onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
            aria-label="Message or Event Details"
          />
          <Button type="submit" disabled={submitting} className="mt-2 w-full h-12 text-base">
            {submitting ? "Submitting..." : "Send Request"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
} 