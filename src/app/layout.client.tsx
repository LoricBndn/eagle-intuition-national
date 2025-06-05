'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { pageview } from '@/lib/gtags'

import { SessionProvider } from 'next-auth/react'
import LayoutContent from '@/components/layout/layout-content'
import CookieConsentBanner from '@/components/ui/cookieConsentBanner'
import UserMenuFloating from '@/components/admin/UserFloatingMenu'

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    pageview(pathname)
  }, [pathname])

  return (
    <SessionProvider>
      <LayoutContent>{children}</LayoutContent>
      <UserMenuFloating />
      <CookieConsentBanner />
    </SessionProvider>
  )
}
