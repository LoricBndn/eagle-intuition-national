import { Pencil, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { deletePartner } from '@/lib/actions';

export function CreatePartner() {
  return (
    <Link
      href="/admin/dashboard/partners/create"
      className="flex h-10 items-center rounded-lg bg-primary px-4 text-sm font-medium text-white transition-colors hover:bg-secondary focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Criar Partner</span>{' '}
      <Plus className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdatePartner({ id }: { id: string }) {
  return (
    <Link
      href={`/admin/dashboard/partners/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <Pencil className="w-5" />
    </Link>
  );
}

export function DeletePartner({ id }: { id: string }) {
  const deletePartnerWithId = deletePartner.bind(null, id);
  
  return (
    <form action={deletePartnerWithId}>
      <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Eliminar</span>
        <Trash2 className="w-5" />
      </button>
    </form>
  );
}