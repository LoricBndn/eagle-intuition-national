import Form from '@/components/post/edit-form';
import Breadcrumbs from '@/components/admin/dashboard/breadcrumbs';
import { fetchPostById } from '@/lib/data';
import { notFound } from 'next/navigation';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const post = await fetchPostById(id);

  if (!post) notFound();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Post', href: '/dashboard/posts' },
          {
            label: 'Edit Post',
            href: `/dashboard/posts/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form post={post} />
    </main>
  );
}