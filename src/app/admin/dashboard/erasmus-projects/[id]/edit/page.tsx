import { notFound } from 'next/navigation';

import { fetchErasmusProjectById } from '@/lib/data';
import Breadcrumbs from '@/components/admin/dashboard/breadcrumbs';
import Form from '@/components/erasmus/project-edit-form';

export default async function Page({ params }: { params: { id: string } }) {
  const project = await fetchErasmusProjectById(params.id);

  if (!project) notFound();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Erasmus Project', href: '/dashboard/erasmus-projects' },
          {
            label: 'Edit Erasmus Project',
            href: `/dashboard/erasmus-projects/${params.id}/edit`,
            active: true,
          },
        ]}
      />
      <Form project={project} />
    </main>
  );
}