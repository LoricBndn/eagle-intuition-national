# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # dev server with Turbopack
npm run build      # prisma generate + next build
npm run start      # production server
npm run lint       # eslint .
npm run seed       # seed admin user into DB (tsx seed.ts)
```

There are no tests in this project.

To apply schema changes after editing `prisma/schema.prisma`:
```bash
npx prisma migrate dev --name <migration-name>
npx prisma generate
```

## Architecture

**Stack**: Next.js 15 App Router, React 19, TypeScript, Tailwind CSS v4, Prisma ORM, PostgreSQL (Neon), NextAuth v4 (credentials), Cloudinary, Zod, Framer Motion.

The site is in **Portuguese** and serves as an institutional website for Eagle Intuition (an educational organization in Portugal).

### Data layer (`src/lib/`)

| File | Purpose |
|---|---|
| `data.ts` | All read queries — used directly in Server Components |
| `actions.ts` | All mutations as `"use server"` Server Actions — form handlers with Zod validation, call `revalidatePath` + `redirect` after each mutation |
| `prisma.ts` | Prisma client singleton |
| `definition.ts` | Shared TypeScript types |
| `utils.ts` | `cn()`, `requireEnv()`, slug generation, pagination helpers |

### Database models

`User`, `Course`, `Post` (with `CategoryPost` enum: `Web | National | International`), `Newsletter` (with `CategoryNewsletter` enum: `National | International`), `ErasmusCourse`, `ErasmusProject`, `Partner`, `Video`.

### Image storage — two separate strategies

- **Posts** → Cloudinary via `POST /api/images/upload` (passes through to Cloudinary upload preset `posts_upload`). Delete via `POST /api/images/delete`.
- **ErasmusCourse, ErasmusProject, Partner** → saved directly to `public/` subdirectories on the server filesystem using `fs/promises` `writeFile`/`unlink`. URLs are stored as relative paths like `/erasmus/courses/images/<uuid>-filename`.

### Authentication

NextAuth v4 with credentials provider. Passwords hashed with bcrypt. After login, `localStorage.setItem('adminLoggedIn', 'true')` is set client-side. `AdminGuard` (`src/components/admin/admin-guard.tsx`) reads `sessionStorage` to redirect unauthenticated users. Dashboard pages also call `getServerSession(authOptions)` server-side for real protection.

### Facebook integration

Three API routes under `/api/facebook/`:
- `posts` — fetches latest posts from the Facebook Graph API (`/PAGE_ID/posts`), uploads their images to Cloudinary, and upserts them as `CategoryPost.National` posts in the DB.
- `erasmus` — similar flow for Erasmus content.
- `token` — refreshes the Facebook Page access token (short-lived → long-lived exchange), then **writes the new token back to Vercel environment variables** via the Vercel REST API (`VERCEL_TOKEN`, `VERCEL_PROJECT_ID`, `VERCEL_TEAM_ID`). The live token is read at runtime from the Vercel API rather than from `process.env` because it changes.

### Route structure

```
/                         → Home (Hero, Sobre Nós, Courses, Posts, Contact)
/noticias                 → News listing with pagination + category filter
/noticias/[slug]          → Individual post
/erasmus                  → Erasmus page (courses + projects)
/contactos                → Contact form (EmailJS)
/admin/login              → Credentials login
/admin/dashboard          → Protected CRUD dashboard
/admin/dashboard/{courses,posts,newsletters,erasmus-courses,erasmus-projects,partners,videos}
```

### Required environment variables

```
DATABASE_URL
NEXTAUTH_SECRET
NEXT_PUBLIC_BASE_URL          # used by Server Actions to self-call /api/images/upload
CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
CLOUDINARY_UPLOAD_PRESET
FACEBOOK_PAGE_ID
FACEBOOK_APP_ID
FACEBOOK_APP_SECRET
FACEBOOK_USER_ACCESS_TOKEN    # refreshed and stored back to Vercel by /api/facebook/token
FACEBOOK_PAGE_ACCESS_TOKEN    # same
VERCEL_TOKEN                  # for token refresh writing to Vercel env
VERCEL_PROJECT_ID
VERCEL_TEAM_ID                # optional
```
