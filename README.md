# SaaS POC — Simplified

This is a simplified React + Vite + Tailwind SaaS starter derived from your original repo. It keeps the same look & feel and the same main pages, but trims storybook, demo assets, and extra cruft for easier deploys.

## Tech
- Vite + React + TypeScript
- TailwindCSS + shadcn/ui (via your existing components)
- React Router 6
- Supabase auth helpers (env-based)
- Optional Tempo (beta) routes in dev

## Available pages
- `/` Landing
- `/products`
- `/custom-print`
- `/login`, `/signup`
- `/dashboard` with nested routes: overview, analytics, financial, calendar, ai-overview, ai-apps, ai-chat, sensors, social-media, settings

## Develop
```bash
npm install
cp .env.example .env # add your keys
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## Deploy — Vercel
- Import the repository in Vercel
- Framework preset: **Vite**
- Build Command: `npm run build`
- Output dir: `dist/`
- Env vars: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`
- `vercel.json` includes SPA fallback rewrites.

## Deploy — Tempo (beta)
- Ensure `tempo-devtools` is installed (already in devDependencies)
- In local dev, enable via `.env`: `VITE_TEMPO=true`
- In Tempo, use the prompt at the bottom of the ChatGPT message to recreate this project in `tempo.new`.

## Notes
- Supabase migrations are included under `/supabase` if you want to wire a backend later.
- The code keeps path aliases `@/*` from `tsconfig.json`.
