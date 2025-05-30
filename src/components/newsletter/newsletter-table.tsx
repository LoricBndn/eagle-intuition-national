import Image from "next/image";
import { fetchFilteredNewsletters } from "@/lib/data";

export default async function NewslettersTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const newsletters = await fetchFilteredNewsletters(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {newsletters?.map((newsletter) => (
              <div
                key={newsletter.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{newsletter.email}</p>
                    </div>
                    <div className="mb-2 flex items-center">
                      <p>{newsletter.createdAt.toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Created At
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {newsletters?.map((newsletter) => (
                <tr
                  key={newsletter.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3"></td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {newsletter.email}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {newsletter.createdAt.toLocaleDateString()}
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
