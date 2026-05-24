import { notFound } from 'next/navigation';

import { fetchErasmusCourseById } from '@/lib/data';
import Breadcrumbs from '@/components/admin/dashboard/breadcrumbs';
import Form from '@/components/erasmus/course-edit-form';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const course = await fetchErasmusCourseById(id);

  if (!course) notFound();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Erasmus Courses', href: '/dashboard/erasmus-courses' },
          {
            label: 'Edit Erasmus Course',
            href: `/dashboard/erasmus-courses/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form course={course} />
    </main>
  );
}