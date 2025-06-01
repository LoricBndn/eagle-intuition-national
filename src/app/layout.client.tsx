'use client'

import { SessionProvider } from 'next-auth/react'
import LayoutContent from '@/components/layout/layout-content'
import CookieConsentBanner from '@/components/ui/cookieConsentBanner'
import UserMenuFloating from '@/components/admin/UserFloatingMenu'

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <LayoutContent>{children}</LayoutContent>
      <UserMenuFloating />
      <CookieConsentBanner />
    </SessionProvider>
  )
}
