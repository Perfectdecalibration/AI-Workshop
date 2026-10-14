# Project state
Last updated: 2026-10-14

## Works
- The Next.js site (App Router, TypeScript, plain CSS) is live on Vercel at https://ai-workshop-steel-psi.vercel.app/
- Slice 1, sign up and log in, is done (marked DONE in roadmap.md, merged to main on 2026-09-30 in PR #4).
- On the live site, a person can create an account with an email address and a password, and then sees "Signed in as" followed by their email.
- A person can sign out, which takes them back to the sign-in form.
- A person can sign back in with their email and password. If the password is wrong, they see an error message and stay signed out.
- A person who closes the tab and comes back to the site is still signed in, without typing their password again.

## In progress
- Slice 2, tasks tagged by skill, is ACTIVE. No task code or tasks table on main yet.

## Broken or flaky
- Nothing known.

## Environment notes
- The site talks to Supabase through @supabase/supabase-js, set up in app/supabaseClient.ts. @supabase/ssr was not added.
- The code reads NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY. These must be in .env.local and in Vercel environment variables.
- Not yet recorded: whether "Confirm email" is off in Supabase. Slice 1 passing suggests it is off.
- Claude Code runs in the browser at claude.ai/code with this repo already selected.

## Decisions
- 2026-10-14: Added slice 4, Due dates, status pending. Due dates are optional and stored as a plain date (no time). The overdue check runs in the browser so it uses the person's local date, not the server's UTC clock. Done tasks and tasks due today are never Overdue.
- 2026-10-14: Reminders stay in the Backlog. They need email or notifications, which means a new service.
- 2026-10-14: Task priority (Low, Normal, High) considered and not chosen. Not in the roadmap.
- 2026-10-14: The commit titled "Implement due dates for tasks with overdue notifications" only updated roadmap.md. No due-date code exists yet.

## Next session
- Build slice 2, tasks tagged by skill: a tasks table with row level security, the add-task form with the six-skill menu, and the done checkbox.
