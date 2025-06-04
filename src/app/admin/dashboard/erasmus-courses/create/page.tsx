import Form from '@/components/erasmus/course-create-form';
import Breadcrumbs from '@/components/admin/dashboard/breadcrumbs';
 
export default async function Page() {
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Erasmus Formações', href: '/admin/dashboard/erasmus-courses' },
          {
            label: 'Criar Erasmus Formações',
            href: '/admin/dashboard/erasmus-courses/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}