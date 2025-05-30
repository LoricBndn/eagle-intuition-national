export function CourseSkeleton() {
  return (
    <div className="course-skeleton">
      <div className="flex items-center space-x-4">
        <div className="h-12 w-12 rounded-md bg-gray-300" />
        <div className="flex-1 space-y-2 py-1">
          <div className="h-6 w-3/4 rounded-md bg-gray-300" />
        </div>
      </div>
    </div>
  );
}
