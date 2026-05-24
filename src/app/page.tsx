import { Suspense } from "react";
import Hero from "@/components/home/hero";
import SobreNos from "@/components/home/sobre-nos";
import CoursesSection from "@/components/course/courses-section";
import PostsHome from "@/components/post/postsHome";
import ContactForm from "@/components/contact/contact-form";
import { CourseCarouselSkeleton, PostsHomeSkeleton } from "@/components/ui/skeletons";
import Title from "@/components/ui/title";

export default function Home() {
  return (
    <div>
      <Hero />
      <SobreNos />
      <Suspense fallback={<CourseCarouselSkeleton />}>
        <CoursesSection />
      </Suspense>
      <div className="flex flex-col items-center default-p-y gap-8">
        <Title title="Novidades" />
        <Suspense fallback={<PostsHomeSkeleton />}>
          <PostsHome />
        </Suspense>
      </div>
      <ContactForm />
    </div>
  );
}
