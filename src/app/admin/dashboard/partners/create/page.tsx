import Form from '@/components/partner/create-form';
import Breadcrumbs from '@/components/admin/dashboard/breadcrumbs';
 
export default async function Page() {
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Partners', href: '/admin/dashboard/partners' },
          {
            label: 'Criar Erasmus Partner',
            href: '/admin/dashboard/partners/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}