import { Check, Clock} from 'lucide-react';
import clsx from 'clsx';

export default function CourseStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-gray-100 text-gray-500': status === 'inactive',
          'bg-green-500 text-white': status === 'active',
        },
      )}
    >
      {status === 'inactive' ? (
        <>
          Inactive
          <Clock className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {status === 'active' ? (
        <>
          Active
          <Check className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}
