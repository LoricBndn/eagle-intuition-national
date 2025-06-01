import { fetchFilteredNewsletters } from "@/lib/data";
import NewsletterTableClient from "@/components/newsletter/newsletter-table-client";

export default async function NewsletterTable({
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
          <NewsletterTableClient newsletters={newsletters} />
        </div>
      </div>
    </div>
  );
}
