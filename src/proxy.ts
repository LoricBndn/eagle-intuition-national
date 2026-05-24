import { auth } from '@/auth'
export default auth((req) => {
  if (!req.auth) {
    const signInUrl = new URL('/admin/login', req.url)
    return Response.redirect(signInUrl)
  }
})

export const config = {
  matcher: ['/admin/dashboard/:path*'],
}
