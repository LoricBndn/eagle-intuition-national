'use client';

import { useState } from 'react';
import { subscribeToNewsletter } from '@/lib/actions';

export default function NewsletterForm() {
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    const result = await subscribeToNewsletter(formData);

    if (result.success) {
      setMessage("Merci pour votre inscription !");
    } else {
      setMessage(result.error || "Une erreur est survenue.");
    }
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-2">
      <input
        type="email"
        name="email"
        required
        placeholder="Subscrever"
        className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <button
        type="submit"
        className="rounded-md bg-primary px-3 py-2 text-sm text-white cursor-pointer"
      >
        Subscrever
      </button>
      {message && (
        <p className="text-sm mt-1">{message}</p>
      )}
    </form>
  );
}
