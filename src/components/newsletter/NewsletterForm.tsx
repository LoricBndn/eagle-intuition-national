'use client';

import React, { useState } from "react";
import { subscribeToNewsletter } from "@/lib/actions"; // l'action server

interface NewsletterFormProps {
  category: 'national' | 'international';
}

export default function NewsletterForm({ category }: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const formData = new FormData(e.currentTarget);
      formData.append('category', category);

      await subscribeToNewsletter(formData);
      setMessage("Merci pour votre inscription !");
      setEmail('');
    } catch (error: any) {
      setMessage(error.message || "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        type="email"
        name="email"
        placeholder="Subscrever"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <button
        type="submit"
        disabled={loading}
        className="rounded-md bg-primary hover:bg-[#e3791e] px-3 py-2 text-sm text-white cursor-pointer disabled:opacity-50"
      >
        {loading ? "Envoi..." : "Subscrever"}
      </button>
      {message && <p className="text-sm text-green-600">{message}</p>}
    </form>
  );
}
