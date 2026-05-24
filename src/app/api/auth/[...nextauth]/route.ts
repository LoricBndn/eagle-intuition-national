import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import type { Session } from 'next-auth'
import type { JWT } from 'next-auth/jwt'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Mot de passe', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error('Email et mot de passe requis')
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        if (!user) throw new Error('Utilisateur non trouvé')

        const isValid = await bcrypt.compare(credentials.password, user.password)
        if (!isValid) throw new Error('Mot de passe incorrect')

        return { id: user.id, name: user.name, email: user.email }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user && token.sub) {
        session.user.id = token.sub
      }
      return session
    },
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
