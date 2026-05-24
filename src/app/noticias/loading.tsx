export default function Loading() {
  return (
    <div>
      <div className="bg-secondary w-full h-140 default-p-x flex flex-col justify-center items-center gap-10">
        <div className="h-8 w-24 rounded-full bg-gray-300 animate-pulse" />
        <div className="h-16 w-96 rounded bg-gray-300 animate-pulse" />
        <div className="h-6 w-80 rounded bg-gray-300 animate-pulse" />
        <div className="h-12 w-full max-w-xl rounded bg-gray-300 animate-pulse" />
      </div>
      <div className="default-p-y default-p-x">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-lg shadow-sm animate-pulse">
              <div className="h-48 w-full rounded-t-lg bg-gray-200" />
              <div className="p-5 space-y-3">
                <div className="h-3 w-20 rounded bg-gray-200" />
                <div className="h-4 w-full rounded bg-gray-200" />
                <div className="h-4 w-3/4 rounded bg-gray-200" />
                <div className="h-9 w-full rounded bg-gray-200 mt-2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
