import { Pencil, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { deleteErasmusCourse, deleteErasmusProject } from '@/lib/actions';

export function CreateErasmusCourse() {
  return (
    <Link
      href="/admin/dashboard/erasmus-courses/create"
      className="flex h-10 items-center rounded-lg bg-primary px-4 text-sm font-medium text-white transition-colors hover:bg-secondary focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Criar Erasmus Formações</span>{' '}
      <Plus className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateErasmusCourse({ id }: { id: string }) {
  return (
    <Link
      href={`/admin/dashboard/erasmus-courses/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <Pencil className="w-5" />
    </Link>
  );
}

export function DeleteErasmusCourse({ id }: { id: string }) {
  const deleteErasmusCourseWithId = deleteErasmusCourse.bind(null, id);
  
  return (
    <form action={deleteErasmusCourseWithId}>
      <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Eliminar</span>
        <Trash2 className="w-5" />
      </button>
    </form>
  );
}

export function CreateErasmusProject() {
  return (
    <Link
      href="/admin/dashboard/erasmus-projects/create"
      className="flex h-10 items-center rounded-lg bg-primary px-4 text-sm font-medium text-white transition-colors hover:bg-secondary focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Criar Erasmus Project</span>{' '}
      <Plus className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateErasmusProject({ id }: { id: string }) {
  return (
    <Link
      href={`/admin/dashboard/erasmus-projects/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <Pencil className="w-5" />
    </Link>
  );
}

export function DeleteErasmusProject({ id }: { id: string }) {
  const deleteErasmusProjectWithId = deleteErasmusProject.bind(null, id);
  
  return (
    <form action={deleteErasmusProjectWithId}>
      <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Eliminar</span>
        <Trash2 className="w-5" />
      </button>
    </form>
  );
}

