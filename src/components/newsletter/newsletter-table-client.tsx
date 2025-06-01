'use client';

import { DeleteNewsletter } from '@/components/newsletter/delete-button';

export default function NewsletterTableClient({ newsletters }: { newsletters: any[] }) {
  return (
    <>
      {/* Version mobile */}
      <div className="md:hidden">
        {newsletters.map((newsletter) => (
          <div key={newsletter.id} className="mb-2 w-full rounded-md bg-white p-4">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <p><strong>Email :</strong> {newsletter.email}</p>
                <p><strong>Créé le :</strong> {new Date(newsletter.createdAt).toLocaleDateString()}</p>
                <p><strong>Catégorie :</strong> {newsletter.category}</p> {/* Ajout catégorie */}
              </div>
              <DeleteNewsletter id={newsletter.id} />
            </div>
          </div>
        ))}
      </div>

      {/* Version desktop */}
      <table className="hidden min-w-full text-gray-900 md:table">
        <thead className="rounded-lg text-left text-sm font-normal">
          <tr>
            <th className="px-4 py-5 font-medium sm:pl-6">Email</th>
            <th className="px-3 py-5 font-medium">Créé le</th>
            <th className="px-3 py-5 font-medium">Catégorie</th> {/* Colonne catégorie */}
            <th className="px-3 py-5 font-medium">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {newsletters.map((newsletter) => (
            <tr key={newsletter.id} className="border-b text-sm last-of-type:border-none">
              <td className="whitespace-nowrap py-3 pl-6 pr-3">{newsletter.email}</td>
              <td className="whitespace-nowrap px-3 py-3">
                {new Date(newsletter.createdAt).toLocaleDateString()}
              </td>
              <td className="whitespace-nowrap px-3 py-3">{newsletter.category}</td> {/* Catégorie */}
              <td className="whitespace-nowrap px-3 py-3">
                <DeleteNewsletter id={newsletter.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
