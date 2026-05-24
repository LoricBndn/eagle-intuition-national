import Image from "next/image";
import { UpdateErasmusCourse, DeleteErasmusCourse } from "@/components/erasmus/buttons";
import { fetchFilteredErasmusCourses } from "@/lib/data";

export default async function ErasmusCourseTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const courses = await fetchFilteredErasmusCourses(query, currentPage);

  if (!courses || courses.length === 0) {
    return <div className="mt-6 text-center text-gray-600">Nenhum curso encontrado.</div>;
  }

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">

          {/* Mobile version */}
          <div className="md:hidden">
            {courses.map((course) => (
              <div key={course.id} className="mb-2 w-full rounded-md bg-white p-4 space-y-3">
                <div className="text-base font-semibold">{course.title}</div>
                <div className="text-sm text-gray-700">{course.description}</div>
                <div>
                  <Image
                    src={course.imageUrl}
                    alt={course.title}
                    width={500}
                    height={200}
                    className="rounded-md object-cover w-full h-auto"
                  />
                </div>
                <div className="text-sm text-blue-600 underline">
                  <a href={course.pdf ?? undefined} target="_blank" rel="noopener noreferrer">Ver PDF</a>
                </div>
                {course.url && (
                  <div className="text-sm text-blue-600 underline">
                    <a href={course.url} target="_blank" rel="noopener noreferrer">Acessar site</a>
                  </div>
                )}
                <div className="text-xs text-gray-500">
                  Criado em: {new Date(course.createdAt).toLocaleDateString("pt-PT")}
                </div>
                <div className="flex justify-end gap-2 pt-2 border-t">
                  <UpdateErasmusCourse id={course.id} />
                  <DeleteErasmusCourse id={course.id} />
                </div>
              </div>
            ))}
          </div>

          {/* Desktop version */}
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="text-left text-sm font-normal">
              <tr>
                <th className="px-4 py-5 font-medium sm:pl-6">Imagem</th>
                <th className="px-3 py-5 font-medium">Título</th>
                <th className="px-3 py-5 font-medium">Descrição</th>
                <th className="px-3 py-5 font-medium">PDF</th>
                <th className="px-3 py-5 font-medium">Site</th>
                <th className="px-3 py-5 font-medium">Criado em</th>
                <th className="px-3 py-5 font-medium text-right"></th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {courses.map((course) => (
                <tr key={course.id} className="border-b text-sm last-of-type:border-none">
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <Image
                      src={course.imageUrl}
                      alt={course.title}
                      width={80}
                      height={80}
                      className="rounded-md object-cover"
                    />
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">{course.title}</td>
                  <td className="whitespace-nowrap px-3 py-3 max-w-xs truncate">{course.description}</td>
                  <td className="whitespace-nowrap px-3 py-3 text-blue-600 underline">
                    <a href={course.pdf ?? undefined} target="_blank" rel="noopener noreferrer">PDF</a>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-blue-600 underline">
                    {course.url ? (
                      <a href={course.url} target="_blank" rel="noopener noreferrer">Site</a>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {new Date(course.createdAt).toLocaleDateString("pt-PT")}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <div className="flex justify-end gap-2">
                      <UpdateErasmusCourse id={course.id} />
                      <DeleteErasmusCourse id={course.id} />
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
