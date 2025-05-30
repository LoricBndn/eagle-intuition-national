import Link from 'next/link';
import NavLinks from '@/components/admin/dashboard/nav-links';
import EagleIntuitionLogo from '@/components/admin/eagle-intuition-logo';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        href="/"
        className="mb-2 flex h-30 items-end justify-start rounded-md p-0 md:h-55 overflow-hidden" 
        // plus de bg-primary, padding à 0 pour que l'image remplisse
      >
        <div className="w-32 md:w-full h-full rounded-md overflow-hidden relative">
          <EagleIntuitionLogo />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
      </div>
    </div>
  );
}
