'use client';

import { Trash2 } from 'lucide-react';
import { deleteNewsletter } from '@/lib/actions';

export function DeleteNewsletter({ id }: { id: string }) {
  const deleteWithId = deleteNewsletter.bind(null, id);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!confirm('Voulez-vous vraiment supprimer cette newsletter ?')) {
      e.preventDefault();
    }
  };

  return (
    <form action={deleteWithId} method="post" onSubmit={handleSubmit}>
      <button
        type="submit"
        className="cursor-pointer rounded-md border p-2 hover:bg-gray-100"
        aria-label="Supprimer"
      >
        <Trash2 className="w-5" />
      </button>
    </form>
  );
}
