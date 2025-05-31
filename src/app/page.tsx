import Hero from "@/components/home/hero";
import SobreNos from "@/components/home/sobre-nos";
import Course from "@/components/course/course";
import PostsHome from "@/components/post/postsHome";
import ContactForm from "@/components/contact/contact-form";

import { fetchCourses } from "@/lib/data"; // adapte selon ton projet

export default async function Home() {
  console.log(fetchCourses())
  const coursesFromDb = await fetchCourses();

const courses = coursesFromDb.map(({ iconUrl, ...rest }) => ({
  ...rest,
  icon: iconUrl,
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
