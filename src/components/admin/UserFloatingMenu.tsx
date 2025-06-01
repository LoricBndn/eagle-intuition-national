'use client'

import { useState, useEffect, useCallback } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'

const AUTO_LOGOUT_TIME = 15 * 60 * 1000

export default function UserMenuFloating() {
  const { data: session, status } = useSession()
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [show, setShow] = useState(false)

  // Logout handler - useCallback called unconditionally at top level
  const handleLogout = useCallback(() => {
    localStorage.removeItem('adminLoggedIn')
    signOut({ callbackUrl: '/' })
  }, [])

  useEffect(() => {
    const adminLoggedIn = localStorage.getItem('adminLoggedIn')
    if (status === 'authenticated' && adminLoggedIn === 'true') {
      setShow(true)
    } else {
      setShow(false)
    }
  }, [status])

  useEffect(() => {
    if (!show) return

    let timeoutId: ReturnType<typeof setTimeout>

    const resetTimer = () => {
      if (timeoutId) clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        handleLogout()
      }, AUTO_LOGOUT_TIME)
    }

    window.addEventListener('mousemove', resetTimer)
    window.addEventListener('keydown', resetTimer)
    window.addEventListener('click', resetTimer)

    resetTimer()

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
      window.removeEventListener('mousemove', resetTimer)
      window.removeEventListener('keydown', resetTimer)
      window.removeEventListener('click', resetTimer)
    }
  }, [show, handleLogout])

  if (!show) return null

  const isAdminRoute = pathname.startsWith('/admin')

  return (
    <div className="fixed bottom-6 right-6 z-50" aria-label="Menu utilisateur flottant">
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="cursor-pointer w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg hover:bg-[#e3791e] transition"
          aria-label="Ouvrir menu utilisateur"
        >
          {session?.user?.name?.[0]?.toUpperCase() ?? 'U'}
        </button>

        {open && (
          <div className="absolute bottom-full right-0 mb-2 w-48 bg-white border rounded shadow-lg">
            {isAdminRoute ? (
              <>
                <button
                  onClick={() => {
                    setOpen(false)
                    router.push('/')
                  }}
                  className="cursor-pointer block w-full px-4 py-2 text-left hover:bg-gray-100"
                >
                  Aller sur le site
                </button>
                <button
                  onClick={() => {
                    setOpen(false)
                    handleLogout()
                  }}
                  className="cursor-pointer block w-full px-4 py-2 text-left hover:bg-gray-100"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setOpen(false)
                    router.push('/admin/dashboard')
                  }}
                  className="cursor-pointer block w-full px-4 py-2 text-left hover:bg-gray-100"
                >
                  Aller au dashboard
                </button>
                <button
                  onClick={() => {
                    setOpen(false)
                    handleLogout()
                  }}
                  className="cursor-pointer block w-full px-4 py-2 text-left hover:bg-gray-100"
                >
                  Déconnexion
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
