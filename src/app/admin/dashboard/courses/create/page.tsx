import Form from '@/components/course/create-form';
import Breadcrumbs from '@/components/admin/dashboard/breadcrumbs';
 
export default async function Page() {
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Formações', href: '/admin/dashboard/courses' },
          {
            label: 'Criar Formações',
            href: '/admin/dashboard/courses/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}