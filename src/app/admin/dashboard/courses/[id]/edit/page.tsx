import Form from '@/components/course/edit-form';
import Breadcrumbs from '@/components/admin/breadcrumbs';
import { fetchCourseById } from '@/lib/data';
import { notFound } from 'next/navigation';

type Props = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: Props) {
  const course = await fetchCourseById(params.id);

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
            href: `/dashboard/courses/${params.id}/edit`,
            active: true,
          },
        ]}
      />
      <Form course={course} />
    </main>
  );
}
