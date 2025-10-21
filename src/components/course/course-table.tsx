import { UpdateCourse, DeleteCourse } from "@/components/course/buttons";
import { fetchFilteredCourses } from "@/lib/data";
import { IconRenderer } from "@/components/ui/icon-picker";

export default async function CoursesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const courses = await fetchFilteredCourses(query, currentPage);

  if (!courses || courses.length === 0) {
    return <div className="mt-6 text-center text-gray-600">Nenhum curso encontrado.</div>;
  }

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          {/* === Version Mobile === */}
          <div className="md:hidden">
            {courses.map((course) => (
              <div
                key={course.id}
                className="mb-2 w-full rounded-md bg-white p-4 shadow-sm"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="mb-2 flex items-center gap-2">
                    <IconRenderer
                      icon={course.icon || "BookOpen"}
                      className="size-6 text-primary"
                    />
                    <p className="font-medium">{course.title}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateCourse id={course.id} />
                    <DeleteCourse id={course.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* === Version Desktop === */}
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="text-left text-sm font-medium">
              <tr>
                <th className="px-4 py-5 font-medium sm:pl-6">Ícone</th>
                <th className="px-3 py-5 font-medium">Nome do curso</th>
                <th className="px-3 py-5 font-medium"></th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {courses.map((course) => (
                <tr
                  key={course.id}
                  className="border-b text-sm last-of-type:border-none"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <IconRenderer
                      icon={course.icon || "BookOpen"}
                      className="size-6 text-primary"
                    />
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {course.title}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateCourse id={course.id} />
                      <DeleteCourse id={course.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
