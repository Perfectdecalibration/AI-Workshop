# Project state
Last updated: 2026-10-01

## Works
- The Next.js site (App Router, TypeScript, plain CSS) is live on Vercel at https://ai-workshop-steel-psi.vercel.app/
- A Supabase project exists and is linked to the repo.
- On the live site, a person can create an account with an email address and a password, and then sees "Signed in as" followed by their email.
- A person can sign out, which takes them back to the sign-in form.
- A person can sign back in with their email and password. If the password is wrong, they see an error message and stay signed out.
- A person who closes the tab and comes back to the site is still signed in, without typing their password again.

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
