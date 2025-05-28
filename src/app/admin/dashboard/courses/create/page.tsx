import Form from '@/components/course/create-form';
import Breadcrumbs from '@/components/admin/breadcrumbs';
 
export default async function Page() {
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Courses', href: '/admin/dashboard/courses' },
          {
            label: 'Create Course',
            href: '/admin/dashboard/courses/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}