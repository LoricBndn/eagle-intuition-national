export default function Loading() {
  return (
    <main className="max-w-4xl mx-auto p-6 pt-30 animate-pulse">
      <div className="h-4 w-40 rounded bg-gray-200 mb-8" />
      <div className="space-y-3 mb-10">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className={`h-4 rounded bg-gray-200 ${i % 3 === 2 ? "w-2/3" : "w-full"}`} />
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-48 rounded-lg bg-gray-200" />
        ))}
      </div>
    </main>
  );
}
