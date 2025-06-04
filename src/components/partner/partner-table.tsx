import Image from "next/image";
import Link from "next/link";
import { UpdatePartner, DeletePartner } from "@/components/partner/buttons";
import { fetchFilteredPartners } from "@/lib/data";

export default async function PartnerTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const partners = await fetchFilteredPartners(query, currentPage);

  if (!partners || partners.length === 0) {
    return <div className="mt-6 text-center text-gray-600">Nenhum parceiro encontrado.</div>;
  }

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">

          {/* Mobile version */}
          <div className="md:hidden">
            {partners.map((partner) => (
              <div key={partner.id} className="mb-2 w-full rounded-md bg-white p-4">
                <div className="space-y-3">
                  <p className="text-lg font-medium">{partner.title}</p>
                  <Link
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline text-sm"
                  >
                    {partner.url}
                  </Link>
                  <div className="relative h-36 w-full overflow-hidden rounded-md">
                    <Image
                      src={partner.imageUrl}
                      alt={partner.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="text-sm text-gray-500">
                    {new Date(partner.createdAt).toLocaleDateString()}
                  </p>
                  <div className="flex justify-end gap-2">
                    <UpdatePartner id={partner.id} />
                    <DeletePartner id={partner.id} />
                  </div>
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
                <th className="px-3 py-5 font-medium">URL</th>
                <th className="px-3 py-5 font-medium">Criado em</th>
                <th className="px-3 py-5 font-medium" />
              </tr>
            </thead>
            <tbody className="bg-white">
              {partners.map((partner) => (
                <tr key={partner.id} className="border-b text-sm last-of-type:border-none">
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <Image
                      src={partner.imageUrl}
                      alt={partner.title}
                      width={80}
                      height={80}
                      className="rounded-md object-cover"
                    />
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">{partner.title}</td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <Link
                      href={partner.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      {partner.url}
                    </Link>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {new Date(partner.createdAt).toLocaleDateString()}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <div className="flex justify-end gap-3">
                      <UpdatePartner id={partner.id} />
                      <DeletePartner id={partner.id} />
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
