# CLAUDE.md

Rules for working in My AIR project, repository Perfectdecalibration/AI-Workshop.

## Stack
- Next.js with the App Router, TypeScript
- Plain CSS. No Tailwind or other CSS frameworks.
- Supabase for sign-in and the database
- Deployed on Vercel at https://ai-workshop-steel-psi.vercel.app/

## Commands
- npm run dev: runs the site locally at http://localhost:3000
- npm run build: builds the site the way Vercel does. Run it before calling any change finished.
- npm run lint: checks the code for common mistakes

## Never
- Add a dependency without asking first. Name the package, say why it is needed, and wait for a yes.
- Edit .env, .env.local, or any environment variable, locally or in Vercel. Say which variable is needed and which file it goes in.
- Change auth configuration without saying what is changing and why, before changing it.
- Create new top-level folders.
- Put passwords, API keys, or connection strings in code, commits, or chat.
- Use real personal data. Fake names and fake content only.
- Work on any slice other than the one marked ACTIVE in roadmap.md.
- Commit or merge unless the prompt says to. By default, show what changed and stop before committing.
- Turn off row level security on any Supabase table.

## Conventions
- Explain every change in plain language as well as code: what changed, in which files, and why. Tim is learning, so define technical terms the first time you use them.
- Keep changes small and inside the ACTIVE slice.
- Pages go in the app directory the repo already uses, following App Router conventions.
- Every Supabase table has row level security on, with policies so each person reads and writes only their own rows.
- Secrets live in .env.local, which is never committed. Only public Supabase values go in variables starting with NEXT_PUBLIC_.
- The six skills are Reading, Writing, Listening, Speaking, Vocabulary, Grammar. Spell and order them this way everywhere.
- When a slice's done-criteria pass on the live site, mark it done in roadmap.md, mark the next slice ACTIVE, and record it in project-state.md.

## Current focus
See roadmap.md. Work only on the slice marked ACTIVE.
