// Loading animation
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function CourseSkeleton() {
  return (
    <div className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 p-4 shadow-sm`}>
      <div className="flex items-center space-x-4">
        {/* Icône du cours */}
        <div className="h-12 w-12 rounded-md bg-gray-200" />
        <div className="flex-1 space-y-2 py-1">
          {/* Titre */}
          <div className="h-6 w-3/4 rounded-md bg-gray-200" />
          {/* Description */}
          <div className="h-4 w-full rounded-md bg-gray-200" />
          <div className="h-4 w-5/6 rounded-md bg-gray-200" />
          {/* Date */}
          <div className="h-4 w-1/4 rounded-md bg-gray-200 mt-2" />
        </div>
        {/* Active indicator */}
        <div className="ml-4 flex flex-col items-center justify-center">
          <div className="h-5 w-5 rounded-full bg-gray-200" />
          <div className="mt-1 text-xs text-gray-400 select-none">Active</div>
        </div>
      </div>
    </div>
  );
}
