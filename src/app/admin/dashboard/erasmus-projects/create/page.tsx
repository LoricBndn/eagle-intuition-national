import Form from '@/components/erasmus/project-create-form';
import Breadcrumbs from '@/components/admin/dashboard/breadcrumbs';
 
export default async function Page() {
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Erasmus Project', href: '/admin/dashboard/erasmus-projects' },
          {
            label: 'Criar Erasmus Project',
            href: '/admin/dashboard/erasmus-projects/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}