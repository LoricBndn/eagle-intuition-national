import { notFound } from 'next/navigation';

import { fetchErasmusCourseById } from '@/lib/data';
import Breadcrumbs from '@/components/admin/dashboard/breadcrumbs';
import Form from '@/components/erasmus/course-edit-form';

export default async function Page({ params }: { params: { id: string } }) {
  const course = await fetchErasmusCourseById(params.id);

  if (!course) notFound();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Erasmus Courses', href: '/dashboard/erasmus-courses' },
          {
            label: 'Edit Erasmus Course',
            href: `/dashboard/erasmus-courses/${params.id}/edit`,
            active: true,
          },
        ]}
      />
      <Form course={course} />
    </main>
  );
}