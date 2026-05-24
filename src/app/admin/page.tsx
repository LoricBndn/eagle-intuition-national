import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Admin',
  robots: 'noindex, nofollow',
}

export default async function AdminPage() {
  const session = await auth()
  if (!session) redirect('/admin/login')
  redirect('/admin/dashboard')
}
