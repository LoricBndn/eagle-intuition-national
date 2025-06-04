import Image from "next/image";
import Link from "next/link";
import { DeleteVideo } from "@/components/video/buttons";
import { fetchFilteredVideos } from "@/lib/data";

export default async function VideoTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const videos = await fetchFilteredVideos(query, currentPage);

  if (!videos || videos.length === 0) {
    return <div className="mt-6 text-center text-gray-600">Nenhum vídeo encontrado.</div>;
  }

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">

          {/* Mobile version */}
          <div className="md:hidden">
            {videos.map((video) => (
              <div key={video.id} className="mb-2 w-full rounded-md bg-white p-4">
                <div className="flex items-center gap-4 mb-2">
                  <Image
                    src={video.imageUrl}
                    alt={`Capa da vídeo ${video.title}`}
                    width={80}
                    height={45}
                    className="rounded-md object-cover"
                  />
                  <p className="text-lg font-medium">{video.title}</p>
                </div>
                <Link
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline text-sm break-words"
                >
                  {video.url}
                </Link>
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(video.createdAt).toLocaleDateString()}
                </p>
                <div className="flex justify-end gap-2 mt-2">
                  <DeleteVideo id={video.id} />
                </div>
              </div>
            ))}
          </div>

          {/* Desktop version */}
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="text-left text-sm font-normal">
              <tr>
                <th className="px-4 py-5 font-medium sm:pl-6">Capa</th>
                <th className="px-3 py-5 font-medium">Título</th>
                <th className="px-3 py-5 font-medium">URL</th>
                <th className="px-3 py-5 font-medium">Criado em</th>
                <th className="px-3 py-5 font-medium" />
              </tr>
            </thead>
            <tbody className="bg-white">
              {videos.map((video) => (
                <tr key={video.id} className="border-b text-sm last-of-type:border-none">
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <Image
                      src={video.imageUrl}
                      alt={`Capa da vídeo ${video.title}`}
                      width={80}
                      height={45}
                      className="rounded-md object-cover"
                    />
                  </td>
                  <td className="whitespace-nowrap py-3 px-3">{video.title}</td>
                  <td className="whitespace-nowrap px-3 py-3 max-w-xs truncate">
                    <Link
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      {video.url}
                    </Link>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {new Date(video.createdAt).toLocaleDateString()}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <div className="flex justify-end gap-3">
                      <DeleteVideo id={video.id} />
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