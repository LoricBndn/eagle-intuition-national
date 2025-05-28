import Form from '@/components/course/edit-form';
import Breadcrumbs from '@/components/admin/breadcrumbs';
import { fetchCourseById } from '@/lib/data';
import { notFound } from 'next/navigation';

export default async function Page(props: { id: string }) {
  const course = await fetchCourseById(props.id);

  if (!course) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Courses', href: '/dashboard/courses' },
          {
            label: 'Edit Course',
            href: `/dashboard/courses/${props.id}/edit`,
            active: true,
          },
        ]}
      />
      <Form course={course} />
    </main>
  );
}
