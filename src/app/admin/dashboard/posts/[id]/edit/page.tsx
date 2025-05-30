import Form from '@/components/post/edit-form';
import Breadcrumbs from '@/components/admin/breadcrumbs';
import { fetchPostById } from '@/lib/data';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
  const post = await fetchPostById(params.id);

  if (!post) notFound();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Post', href: '/dashboard/posts' },
          {
            label: 'Edit Post',
            href: `/dashboard/posts/${params.id}/edit`,
            active: true,
          },
        ]}
      />
      <Form post={post} />
    </main>
  );
}