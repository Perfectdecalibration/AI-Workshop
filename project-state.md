# Project state
Last updated: 2026-09-23

## Works
- The Next.js site (App Router, TypeScript, plain CSS) is live on Vercel at https://ai-workshop-steel-psi.vercel.app/
- A Supabase project exists and is linked to the repo.

## Broken or flaky
- Nothing known. No features have been built yet.

## Environment notes
- The site does not use Supabase yet: no Supabase code, no tables, no sign-in.
- Not yet checked: whether the Supabase URL and public key are in .env.local and in Vercel environment variables.
- Not yet checked: whether "Confirm email" is on in Supabase. It is on by default.
- Claude Code runs in the browser at claude.ai/code with this repo already selected.

## Next session
- Start slice 1, sign up and log in.
- Decide first: turn off "Confirm email" in Supabase so a made-up address can sign up.
- Approve or reject adding @supabase/supabase-js and @supabase/ssr, the Supabase libraries slice 1 needs.
- Tim puts the Supabase URL and public key into .env.local and Vercel himself; Claude Code does not edit environment variables.
