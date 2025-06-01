import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect("/admin/login")

  return (
    <main className="p-6">
      <header className="flex items-center mb-6">
        <h1 className="text-xl md:text-2xl font-bold">Dashboard</h1>
      </header>

      <p className="mb-6">Bienvenue, {session.user?.name}</p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Ton contenu */}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        {/* Ton contenu */}
      </div>
    </main>

  )
}
