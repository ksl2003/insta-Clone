# insta-Clone

An Instagram-like clone built with modern web tools.

## Status
This repository implements a minimal Instagram-like web app — a learning/demo project built with TypeScript, Next.js, Tailwind CSS, Prisma, NextAuth, and Pinata (IPFS storage).

## Features
- User sign-up / sign-in with **NextAuth**
- User profiles
- Creating posts with images/media (stored via **Pinata/IPFS**)
- Feed: list of posts from followed users or global feed
- Likes and comments
- Responsive UI using Tailwind CSS

## Tech Stack
- **Framework**: Next.js (TypeScript)
- **Styling**: Tailwind CSS + PostCSS
- **ORM / DB**: Prisma
- **Auth**: NextAuth
- **Storage**: Pinata (IPFS)
- **Runtime / Package Manager**: Node.js (npm or Bun)
- **Language**: TypeScript

## Repository Layout
```
insta-Clone/
├── prisma/                 # Prisma schema & migrations
├── public/                 # Static assets (images, icons)
├── src/                    # Application source (pages/components/api)
├── package.json            # npm scripts & dependencies
├── package-lock.json / bun.lockb
├── next.config.mjs         # Next.js configuration
├── tailwind.config.ts      # Tailwind configuration
├── postcss.config.mjs      # PostCSS configuration
├── tsconfig.json           # TypeScript configuration
└── LICENSE (MIT)
```

## Prerequisites
- Node.js (>=16)
- npm or Bun
- A database supported by Prisma (PostgreSQL, MySQL, SQLite)
- Pinata API key / JWT for media uploads

## Environment Variables
Create a `.env` file in the project root:
```env
# Database
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/insta_clone?schema=public"

# NextAuth
NEXTAUTH_SECRET="<your-secret>"
NEXTAUTH_URL="http://localhost:3000"

# Pinata (IPFS)
PINATA_JWT="<your-pinata-jwt>"
# or if using API keys:
# PINATA_API_KEY="<api_key>"
# PINATA_SECRET_API_KEY="<api_secret>"
```

## Installation
### With npm
```bash
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

### With Bun
```bash
bun install
npx prisma generate
npx prisma migrate dev --name init
bun run dev
```

## Database (Prisma)
1. Set `DATABASE_URL` in `.env`.
2. Run `npx prisma generate`.
3. Run `npx prisma migrate dev --name <migration>`.
4. For production: `npx prisma migrate deploy`.

## Scripts
```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint"
}
```

## Deployment
- **Vercel**: recommended for Next.js.
- **Others**: Netlify, Render, Railway.
- Ensure environment variables and Prisma migrations are set.

## Contributing
1. Fork the repo and create a feature branch.
2. Run tests and linters locally.
3. Open a PR with clear description of changes.

## Troubleshooting
- Check `DATABASE_URL` and database connectivity.
- Ensure all required environment variables are set (`NEXTAUTH_SECRET`, `PINATA_JWT`, etc.).
- Use `npx prisma db pull` for existing DB introspection.

## License
This project is under the MIT License.

## Acknowledgements
Thanks to Next.js, Tailwind CSS, Prisma, NextAuth, Pinata, and the TypeScript/JavaScript communities.
