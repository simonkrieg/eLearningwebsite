# E-Learning Creations Website

React, TypeScript, Vite, Tailwind CSS, and Supabase website for E-Learning Creations.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and set the Supabase values:

   ```bash
   VITE_SUPABASE_URL=...
   VITE_SUPABASE_ANON_KEY=...
   ```

3. Start the local dev server:

   ```bash
   npm run dev
   ```

## Deployment

Set these environment variables in the hosting provider before deploying:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Use the production build command:

```bash
npm run build
```

The build output is `dist`.

For Netlify, `public/_redirects` handles client-side routing. For Vercel, `vercel.json` handles the same SPA fallback.

## Supabase

The Supabase CLI is installed as a project dev dependency.

Useful commands:

```bash
npm run supabase -- --version
npm run supabase:status
npm run supabase:db:push
npm run supabase:functions:deploy -- cyber-security-flyer
```

To link this local project to a hosted Supabase project, first authenticate the CLI with a Supabase access token:

```bash
npm run supabase -- login
npm run supabase -- link --project-ref yxdyuyvqevusxtvcmozc
```

Alternatively, migrations can be pushed with a percent-encoded database connection string:

```bash
npm run supabase -- db push --db-url "postgresql://..."
```

## Verification

Run all deployment checks locally:

```bash
npm run deploy:check
```
