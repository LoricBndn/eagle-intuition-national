import Form from '@/components/course/edit-form';
import Breadcrumbs from '@/components/course/breadcrumbs';
import { fetchCourseById } from '@/lib/data';
import { notFound } from 'next/navigation';
 
export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    const course = await Promise.all(fetchCourseById(id));

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
                href: `/dashboard/courses/${id}/edit`,
                active: true,
            },
            ]}
        />
        <Form course={course} />
        </main>
    );
}