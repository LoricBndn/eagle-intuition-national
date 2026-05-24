import { fetchCourses } from "@/lib/data";
import Course from "@/components/course/course";

export default async function CoursesSection() {
  const coursesFromDb = await fetchCourses();
  const courses = coursesFromDb.map(({ ...rest }) => ({ ...rest }));
  return <Course items={courses} />;
}
