'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem('adminLoggedIn')
    if (!isLoggedIn) {
      router.replace('/admin/login')
    }
  }, [])

  return <>{children}</>
}
