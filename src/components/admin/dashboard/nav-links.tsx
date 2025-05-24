'use client';

import {
  Users,
  Home,
  FileText,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
  { name: 'Home', href: '/admin/dashboard', icon: Home },
  {
    name: 'Formaçao',
    href: '/admin/dashboard/formacao',
    icon: FileText,
  },
  { name: 'Noticias', href: '/admin/dashboard/noticias', icon: Users },
];

export default function NavLinks() {
  const pathname = usePathname();
  
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-secondary hover:text-primary md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-secondary text-primary': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
