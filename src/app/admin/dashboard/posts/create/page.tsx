import Form from '@/components/post/create-form';
import Breadcrumbs from '@/components/admin/dashboard/breadcrumbs';
 
export default async function Page() {
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Posts', href: '/admin/dashboard/posts' },
          {
            label: 'Create Post',
            href: '/admin/dashboard/posts/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}