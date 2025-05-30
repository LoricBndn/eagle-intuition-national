import Form from '@/components/post/create-form';
import Breadcrumbs from '@/components/admin/breadcrumbs';
 
export default async function Page() {
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Posts', href: '/admin/dashboard/posts' },
          {
            label: 'Create Course',
            href: '/admin/dashboard/posts/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}