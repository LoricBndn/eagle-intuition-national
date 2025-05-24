import Hero from "@/components/home/hero";
import SobreNos from "@/components/home/sobre-nos";
import Course from "@/components/course/course";
import Post from "@/components/post/post";

export default function Home() {
  return (
    <div>
      <Hero />
      <SobreNos />
      <Course />
      <Post />
    </div>
  );
}
