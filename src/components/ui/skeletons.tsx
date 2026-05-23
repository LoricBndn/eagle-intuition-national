export function CourseSkeleton() {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          {/* Mobile version */}
          <div className="md:hidden">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="mb-2 w-full rounded-md bg-white p-4 animate-pulse">
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="mb-2 flex items-center">
                    <div className="mr-2 h-7 w-7 rounded-full bg-gray-200" />
                    <div className="h-4 w-32 rounded bg-gray-200" />
                  </div>
                  <div className="flex gap-2">
                    <div className="h-8 w-8 rounded bg-gray-200" />
                    <div className="h-8 w-8 rounded bg-gray-200" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop version */}
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="text-left text-sm font-normal">
              <tr>
                <th className="px-4 py-5 font-medium sm:pl-6">Ícone</th>
                <th className="px-3 py-5 font-medium">Form</th>
                <th className="px-3 py-5 font-medium" />
              </tr>
            </thead>
            <tbody className="bg-white animate-pulse">
              {Array.from({ length: 8 }).map((_, i) => (
                <tr key={i} className="border-b text-sm last-of-type:border-none">
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="h-7 w-7 rounded-full bg-gray-200" />
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <div className="h-4 w-40 rounded bg-gray-200" />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <div className="h-8 w-8 rounded bg-gray-200" />
                      <div className="h-8 w-8 rounded bg-gray-200" />
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

export function PostSkeleton() {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">

          {/* Mobile version */}
          <div className="md:hidden">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="mb-2 w-full rounded-md bg-white p-4 animate-pulse">
                <div className="space-y-3">
                  <div className="h-4 w-40 rounded bg-gray-200" /> {/* Título */}
                  <div className="h-4 w-28 rounded bg-gray-200" /> {/* Categoria */}
                  <div className="h-4 w-56 rounded bg-gray-200" /> {/* Resumo */}
                  <div className="h-32 w-full rounded bg-gray-200" /> {/* Imagem */}
                  <div className="h-4 w-24 rounded bg-gray-200" /> {/* Data */}
                  <div className="flex justify-end gap-2 pt-2">
                    <div className="h-8 w-8 rounded bg-gray-200" /> {/* Botão 1 */}
                    <div className="h-8 w-8 rounded bg-gray-200" /> {/* Botão 2 */}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop version */}
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="text-left text-sm font-normal">
              <tr>
                <th className="px-4 py-5 font-medium sm:pl-6">Título</th>
                <th className="px-3 py-5 font-medium">Categoria</th>
                <th className="px-3 py-5 font-medium">Resumo</th>
                <th className="px-3 py-5 font-medium">Imagem principal</th>
                <th className="px-3 py-5 font-medium">Data</th>
                <th className="px-3 py-5 font-medium text-right"></th>
              </tr>
            </thead>
            <tbody className="bg-white animate-pulse">
              {Array.from({ length: 8 }).map((_, i) => (
                <tr
                  key={i}
                  className="border-b py-3 text-sm last-of-type:border-none"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="h-4 w-32 rounded bg-gray-200" />
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <div className="h-4 w-24 rounded bg-gray-200" />
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <div className="h-4 w-48 rounded bg-gray-200" />
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <div className="h-10 w-10 rounded-md bg-gray-200" />
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <div className="h-4 w-20 rounded bg-gray-200" />
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <div className="h-8 w-8 rounded bg-gray-200" />
                      <div className="h-8 w-8 rounded bg-gray-200" />
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

export function NewsletterSkeleton() {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">

          {/* Mobile version */}
          <div className="md:hidden">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="mb-2 w-full rounded-md bg-white p-4 animate-pulse">
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="space-y-2">
                    <div className="h-4 w-40 rounded bg-gray-200" />
                    <div className="h-4 w-32 rounded bg-gray-200" />
                    <div className="h-4 w-28 rounded bg-gray-200" />
                  </div>
                  <div className="h-8 w-8 rounded bg-gray-200" />
                </div>
              </div>
            ))}
          </div>

          {/* Desktop version */}
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th className="px-4 py-5 font-medium sm:pl-6">Email :</th>
                <th className="px-3 py-5 font-medium">Criado na</th>
                <th className="px-3 py-5 font-medium">Categoria</th>
                <th className="px-3 py-5 font-medium"></th>
              </tr>
            </thead>
            <tbody className="bg-white animate-pulse">
              {Array.from({ length: 8 }).map((_, i) => (
                <tr key={i} className="border-b text-sm last-of-type:border-none">
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="h-4 w-40 rounded bg-gray-200" />
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <div className="h-4 w-24 rounded bg-gray-200" />
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <div className="h-4 w-20 rounded bg-gray-200" />
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <div className="h-8 w-8 rounded bg-gray-200 ml-auto" />
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

export function ErasmusCourseSkeleton() {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">

          {/* Mobile version */}
          <div className="md:hidden">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="mb-2 w-full rounded-md bg-white p-4 animate-pulse">
                  <div className="space-y-3">
                    <div className="h-5 w-40 rounded bg-gray-200" /> {/* Titre */}
                    <div className="h-4 w-full rounded bg-gray-200" /> {/* Description */}
                    <div className="h-36 w-full rounded bg-gray-200" /> {/* Image */}
                    <div className="h-4 w-28 rounded bg-gray-200" /> {/* PDF */}
                    <div className="h-4 w-32 rounded bg-gray-200" /> {/* Lien externe */}
                    <div className="h-4 w-24 rounded bg-gray-200" /> {/* Date */}
                    <div className="flex justify-end gap-2 pt-2">
                      <div className="h-8 w-8 rounded bg-gray-200" /> {/* Botão 1 */}
                      <div className="h-8 w-8 rounded bg-gray-200" /> {/* Botão 2 */}
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
                <th className="px-3 py-5 font-medium">Descrição</th>
                <th className="px-3 py-5 font-medium">PDF</th>
                <th className="px-3 py-5 font-medium">Site</th>
                <th className="px-3 py-5 font-medium">Criado em</th>
                <th className="px-3 py-5 font-medium text-right"></th>
              </tr>
            </thead>
            <tbody className="bg-white animate-pulse">
              {Array.from({ length: 8 }).map((_, i) => (
                <tr key={i} className="border-b text-sm last-of-type:border-none">
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="h-20 w-20 rounded-md bg-gray-200" />
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <div className="h-5 w-40 rounded bg-gray-200" />
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <div className="h-4 w-64 rounded bg-gray-200" />
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <div className="h-4 w-24 rounded bg-gray-200" />
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <div className="h-4 w-32 rounded bg-gray-200" />
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <div className="h-4 w-24 rounded bg-gray-200" />
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <div className="h-8 w-8 rounded bg-gray-200" />
                      <div className="h-8 w-8 rounded bg-gray-200" />
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

export function ErasmusProjectSkeleton() {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">

          {/* Mobile version */}
          <div className="md:hidden">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="mb-2 w-full rounded-md bg-white p-4 animate-pulse">
                <div className="space-y-3">
                  <div className="h-5 w-40 rounded bg-gray-200" /> {/* Titre */}
                  <div className="h-4 w-56 rounded bg-gray-200" /> {/* URL */}
                  <div className="h-36 w-full rounded bg-gray-200" /> {/* Image */}
                  <div className="h-4 w-28 rounded bg-gray-200" /> {/* Date */}
                  <div className="flex justify-end gap-2 pt-2">
                      <div className="h-8 w-8 rounded bg-gray-200" /> {/* Botão 1 */}
                      <div className="h-8 w-8 rounded bg-gray-200" /> {/* Botão 2 */}
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
                <th className="px-3 py-5 font-medium text-right"></th>
              </tr>
            </thead>
            <tbody className="bg-white animate-pulse">
              {Array.from({ length: 8 }).map((_, i) => (
                <tr key={i} className="border-b text-sm last-of-type:border-none">
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="h-20 w-20 rounded-md bg-gray-200" />
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <div className="h-5 w-40 rounded bg-gray-200" />
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <div className="h-4 w-48 rounded bg-gray-200" />
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <div className="h-4 w-24 rounded bg-gray-200" />
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <div className="h-8 w-8 rounded bg-gray-200" />
                      <div className="h-8 w-8 rounded bg-gray-200" />
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

export function PartnerSkeleton() {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">

          {/* Mobile version */}
          <div className="md:hidden">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="mb-2 w-full rounded-md bg-white p-4 animate-pulse">
                <div className="space-y-3">
                  <div className="h-5 w-40 rounded bg-gray-200" /> {/* Titre */}
                  <div className="h-4 w-56 rounded bg-gray-200" /> {/* URL */}
                  <div className="h-36 w-full rounded bg-gray-200" /> {/* Image */}
                  <div className="h-4 w-28 rounded bg-gray-200" /> {/* Date */}
                  <div className="flex justify-end gap-2 pt-2">
                      <div className="h-8 w-8 rounded bg-gray-200" /> {/* Botão 1 */}
                      <div className="h-8 w-8 rounded bg-gray-200" /> {/* Botão 2 */}
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
                <th className="px-3 py-5 font-medium">Nome</th>
                <th className="px-3 py-5 font-medium">URL</th>
                <th className="px-3 py-5 font-medium">Criado em</th>
                <th className="px-3 py-5 font-medium text-right"></th>
              </tr>
            </thead>
            <tbody className="bg-white animate-pulse">
              {Array.from({ length: 8 }).map((_, i) => (
                <tr key={i} className="border-b text-sm last-of-type:border-none">
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="h-20 w-20 rounded-md bg-gray-200" />
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <div className="h-5 w-40 rounded bg-gray-200" />
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <div className="h-4 w-48 rounded bg-gray-200" />
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <div className="h-4 w-24 rounded bg-gray-200" />
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <div className="h-8 w-8 rounded bg-gray-200" />
                      <div className="h-8 w-8 rounded bg-gray-200" />
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

export function VideoSkeleton() {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">

          {/* Mobile version */}
          <div className="md:hidden">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="mb-2 w-full rounded-md bg-white p-4 animate-pulse">
                <div className="flex items-center gap-4 mb-3">
                  <div className="h-12 w-20 rounded-md bg-gray-200" /> {/* Image de couverture */}
                  <div className="flex-1 space-y-3">
                    <div className="h-5 w-40 rounded bg-gray-200" /> {/* Titre */}
                    <div className="h-4 w-56 rounded bg-gray-200" /> {/* URL */}
                    <div className="h-4 w-28 rounded bg-gray-200" /> {/* Date */}
                  </div>
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
              </tr>
            </thead>
            <tbody className="bg-white animate-pulse">
              {Array.from({ length: 8 }).map((_, i) => (
                <tr key={i} className="border-b text-sm last-of-type:border-none">
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="h-12 w-20 rounded-md bg-gray-200" /> {/* Image de couverture */}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-3 pr-3">
                    <div className="h-5 w-40 rounded bg-gray-200" /> {/* Titre */}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <div className="h-4 w-64 rounded bg-gray-200" /> {/* URL */}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <div className="h-4 w-24 rounded bg-gray-200" /> {/* Date */}
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
