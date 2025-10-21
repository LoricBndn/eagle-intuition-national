import Hero from "@/components/home/hero";
import SobreNos from "@/components/home/sobre-nos";
import Course from "@/components/course/course";
import PostsHome from "@/components/post/postsHome";
import ContactForm from "@/components/contact/contact-form";

import { fetchCourses } from "@/lib/data";

export default async function Home() {
  const coursesFromDb = await fetchCourses();

  const courses = coursesFromDb.map(({...rest }) => ({
    ...rest,
  }));

  return (
    <div>
      <Hero />
      <SobreNos />
      <Course items={courses} />
      <PostsHome />
      <ContactForm />
    </div>
  );
}
